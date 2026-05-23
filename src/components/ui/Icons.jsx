/**
 * Centralized icon library for FitNova — powered by react-icons.
 *
 * All components across the app import from this file so icon choices
 * can be changed in one place without touching any other code.
 *
 * Icon sets used:
 *   gi  — Game Icons (body parts & fitness)
 *   fa6 — Font Awesome 6 (UI actions)
 *   io5 — Ionicons 5 (search, close)
 *   tb  — Tabler Icons (misc)
 */

// ─── Game Icons (body parts & fitness) ──────────────────────────────────────
import {
  GiAbdominalArmor,
  GiLeg,
  GiMuscleUp,
  GiChestArmor,
  GiShoulderArmor,
  GiMuscularTorso,
  GiFist,
  GiBackPain,
  GiRun,
  GiWeightLiftingUp,
  GiWeight,
} from 'react-icons/gi'

// ─── Font Awesome 6 ────────────────────────────────────────────────────────
import {
  FaFire,
  FaHeart,
  FaRegHeart,
  FaTrophy,
  FaMagnifyingGlass,
  FaXmark,
  FaCircleExclamation,
  FaBoltLightning,
} from 'react-icons/fa6'

// ─── Body Part Icons ────────────────────────────────────────────────────────

export const AbdominalsIcon = (props) => <GiAbdominalArmor {...props} />
export const LegIcon = (props) => <GiLeg {...props} />
export const BicepIcon = (props) => <GiMuscleUp {...props} />
export const CalfIcon = (props) => <GiLeg {...props} />
export const ChestIcon = (props) => <GiChestArmor {...props} />
export const ForearmIcon = (props) => <GiFist {...props} />
export const GlutesIcon = (props) => <FaBoltLightning {...props} />
export const HamstringIcon = (props) => <GiRun {...props} />
export const BackIcon = (props) => <GiBackPain {...props} />
export const NeckIcon = (props) => <GiMuscularTorso {...props} />
export const ShoulderIcon = (props) => <GiShoulderArmor {...props} />
export const TrapIcon = (props) => <GiShoulderArmor {...props} />

// ─── UI / Action Icons ──────────────────────────────────────────────────────

export const DumbbellIcon = (props) => <GiWeight {...props} />
export const FireIcon = (props) => <FaFire {...props} />
export const SearchIcon = (props) => <FaMagnifyingGlass {...props} />
export const CloseIcon = (props) => <FaXmark {...props} />
export const TrophyIcon = (props) => <FaTrophy {...props} />
export const AlertCircleIcon = (props) => <FaCircleExclamation {...props} />
export const WeightlifterIcon = (props) => <GiWeightLiftingUp {...props} />

export const HeartIcon = ({ filled = false, ...props }) =>
  filled ? <FaHeart {...props} /> : <FaRegHeart {...props} />

// ─── Body Part Mapping ──────────────────────────────────────────────────────

/**
 * Maps body part names to their corresponding icon components.
 * Used by BodyPartCategories and anywhere muscle groups are displayed.
 */
export const bodyPartIconMap = {
  abdominals: AbdominalsIcon,
  abductors: LegIcon,
  adductors: LegIcon,
  biceps: BicepIcon,
  calves: CalfIcon,
  chest: ChestIcon,
  forearms: ForearmIcon,
  glutes: GlutesIcon,
  hamstrings: HamstringIcon,
  lats: BackIcon,
  'lower back': BackIcon,
  'middle back': BackIcon,
  neck: NeckIcon,
  quadriceps: LegIcon,
  shoulders: ShoulderIcon,
  traps: TrapIcon,
  triceps: BicepIcon,
}

/**
 * Renders the appropriate body part icon for a given muscle name.
 * Falls back to DumbbellIcon if no specific icon exists.
 */
export const BodyPartIcon = ({ bodyPart, ...props }) => {
  const IconComponent = bodyPartIconMap[bodyPart] || DumbbellIcon
  return <IconComponent {...props} />
}
