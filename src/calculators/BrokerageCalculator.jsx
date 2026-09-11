import { useMemo, useState } from "react";
import CalculatorShell from "../components/ui/CalculatorShell";
import { NumberField, SegmentedField } from "../components/ui/SelectField";
import StatCard from "../components/ui/StatCard";
import DataTable from "../components/ui/DataTable";
import { formatCompact, formatCurrency } from "../lib/format";

const SEGMENTS = [
  { label: "Equity Delivery", value: "delivery" },
  { label: "Equity Intraday", value: "intraday" },
  { label: "F&O Futures", value: "futures" },
  { label: "F&O Options", value: "options" },
];

function computeCharges({ buyPrice, sellPrice, qty, segment }) {
  const buyTurnover = buyPrice * qty;
  const sellTurnover = sellPrice * qty;
  const turnover = buyTurnover + sellTurnover;

  const perOrderBrokerage = (value) => Math.min(20, value * 0.0003);
  const brokerage = perOrderBrokerage(buyTurnover) + perOrderBrokerage(sellTurnover);

  let stt = 0;
  let stampDutyRate = 0;
  let exchangeTxnRate = 0.0000297;

  if (segment === "delivery") {
    stt = turnover * 0.001;
    stampDutyRate = 0.00015;
  } else if (segment === "intraday") {
    stt = sellTurnover * 0.00025;
    stampDutyRate = 0.00003;
  } else if (segment === "futures") {
    stt = sellTurnover * 0.0002;
    stampDutyRate = 0.00002;
    exchangeTxnRate = 0.0000188;
  } else {
    stt = sellTurnover * 0.001;
    stampDutyRate = 0.00003;
    exchangeTxnRate = 0.0003503;
  }

  const exchangeTxnCharge = turnover * exchangeTxnRate;
  const sebiCharges = (turnover * 10) / 10000000;
  const stampDuty = buyTurnover * stampDutyRate;
  const gst = (brokerage + exchangeTxnCharge + sebiCharges) * 0.18;

  const totalCharges = brokerage + stt + exchangeTxnCharge + sebiCharges + stampDuty + gst;
  const pnl = sellTurnover - buyTurnover;
  const netPnl = pnl - totalCharges;

  return { turnover, brokerage, stt, exchangeTxnCharge, sebiCharges, stampDuty, gst, totalCharges, pnl, netPnl };
}

export default function BrokerageCalculator() {
  const [buyPrice, setBuyPrice] = useState(1000);
  const [sellPrice, setSellPrice] = useState(1050);
  const [qty, setQty] = useState(100);
  const [segment, setSegment] = useState("delivery");

  const result = useMemo(
    () => computeCharges({ buyPrice: buyPrice || 0, sellPrice: sellPrice || 0, qty: qty || 0, segment }),
    [buyPrice, sellPrice, qty, segment]
  );

  return (
    <CalculatorShell
      title="Brokerage Calculator"
      category="Trading"
      description="Break down brokerage, STT, exchange charges, stamp duty and GST on a stock trade (typical discount-broker rates)."
      inputs={
        <>
          <SegmentedField label="Segment" value={segment} onChange={setSegment} options={SEGMENTS} />
          <NumberField label="Buy Price" prefix="₹" value={buyPrice} onChange={setBuyPrice} />
          <NumberField label="Sell Price" prefix="₹" value={sellPrice} onChange={setSellPrice} />
          <NumberField label="Quantity" value={qty} onChange={setQty} />
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Turnover" value={formatCompact(result.turnover)} />
        <StatCard label="Total Charges" value={formatCompact(result.totalCharges)} />
        <StatCard label="Net P&L" value={formatCompact(result.netPnl)} highlight />
      </div>
      <DataTable
        title="Charges Breakdown"
        columns={["Component", "Amount"]}
        rows={[
          ["Brokerage", formatCurrency(result.brokerage)],
          ["STT", formatCurrency(result.stt)],
          ["Exchange Transaction Charges", formatCurrency(result.exchangeTxnCharge)],
          ["SEBI Charges", formatCurrency(result.sebiCharges)],
          ["Stamp Duty", formatCurrency(result.stampDuty)],
          ["GST", formatCurrency(result.gst)],
          ["Total Charges", formatCurrency(result.totalCharges)],
          ["Gross P&L", formatCurrency(result.pnl)],
          ["Net P&L", formatCurrency(result.netPnl)],
        ]}
      />
    </CalculatorShell>
  );
}
