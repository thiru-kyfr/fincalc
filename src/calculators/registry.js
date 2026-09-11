import SipCalculator from "./SipCalculator";
import LumpsumCalculator from "./LumpsumCalculator";
import SwpCalculator from "./SwpCalculator";
import MfReturnsCalculator from "./MfReturnsCalculator";
import StepUpSipCalculator from "./StepUpSipCalculator";
import CagrCalculator from "./CagrCalculator";
import XirrCalculator from "./XirrCalculator";
import RoiCalculator from "./RoiCalculator";

import SsyCalculator from "./SsyCalculator";
import PpfCalculator from "./PpfCalculator";
import EpfCalculator from "./EpfCalculator";
import FdCalculator from "./FdCalculator";
import RdCalculator from "./RdCalculator";
import NpsCalculator from "./NpsCalculator";
import ApyCalculator from "./ApyCalculator";
import NscCalculator from "./NscCalculator";
import PostOfficeMisCalculator from "./PostOfficeMisCalculator";
import ScssCalculator from "./ScssCalculator";
import RetirementCalculator from "./RetirementCalculator";

import IncomeTaxCalculator from "./IncomeTaxCalculator";
import HraCalculator from "./HraCalculator";
import TdsCalculator from "./TdsCalculator";
import GstCalculator from "./GstCalculator";
import GratuityCalculator from "./GratuityCalculator";
import SalaryCalculator from "./SalaryCalculator";

import EmiCalculator from "./EmiCalculator";
import CarLoanEmiCalculator from "./CarLoanEmiCalculator";
import HomeLoanEmiCalculator from "./HomeLoanEmiCalculator";
import SimpleInterestCalculator from "./SimpleInterestCalculator";
import CompoundInterestCalculator from "./CompoundInterestCalculator";
import FlatVsReducingCalculator from "./FlatVsReducingCalculator";
import InflationCalculator from "./InflationCalculator";

import BrokerageCalculator from "./BrokerageCalculator";
import MarginCalculator from "./MarginCalculator";
import StockAverageCalculator from "./StockAverageCalculator";

export const CALCULATOR_COMPONENTS = {
  sip: SipCalculator,
  lumpsum: LumpsumCalculator,
  swp: SwpCalculator,
  "mf-returns": MfReturnsCalculator,
  "step-up-sip": StepUpSipCalculator,
  cagr: CagrCalculator,
  xirr: XirrCalculator,
  roi: RoiCalculator,

  ssy: SsyCalculator,
  ppf: PpfCalculator,
  epf: EpfCalculator,
  fd: FdCalculator,
  rd: RdCalculator,
  nps: NpsCalculator,
  apy: ApyCalculator,
  nsc: NscCalculator,
  "post-office-mis": PostOfficeMisCalculator,
  scss: ScssCalculator,
  retirement: RetirementCalculator,

  "income-tax": IncomeTaxCalculator,
  hra: HraCalculator,
  tds: TdsCalculator,
  gst: GstCalculator,
  gratuity: GratuityCalculator,
  salary: SalaryCalculator,

  emi: EmiCalculator,
  "car-loan-emi": CarLoanEmiCalculator,
  "home-loan-emi": HomeLoanEmiCalculator,
  "simple-interest": SimpleInterestCalculator,
  "compound-interest": CompoundInterestCalculator,
  "flat-vs-reducing": FlatVsReducingCalculator,
  inflation: InflationCalculator,

  brokerage: BrokerageCalculator,
  margin: MarginCalculator,
  "stock-average": StockAverageCalculator,
};
