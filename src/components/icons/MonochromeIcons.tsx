import React from 'react';

// Monochrome (Non-Colored) Business Icons
// This file contains business-appropriate icons without color
// Each icon is a functional component that returns the icon as a span element

interface IconProps {
  className?: string;
}

// Basic Symbols
export const PlusIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>+</span>;
export const MinusIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>−</span>;
export const MultiplyIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>×</span>;
export const DivideIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>÷</span>;
export const EqualsIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>=</span>;
export const PercentIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>%</span>;
export const HashtagIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>#</span>;
export const AtSymbolIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>@</span>;
export const AmpersandIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>&</span>;
export const AsteriskIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>*</span>;

// Arrows
export const ArrowUpIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>↑</span>;
export const ArrowDownIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>↓</span>;
export const ArrowLeftIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>←</span>;
export const ArrowRightIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>→</span>;
export const ArrowUpRightIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>↗</span>;
export const ArrowDownRightIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>↘</span>;
export const ArrowDownLeftIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>↙</span>;
export const ArrowUpLeftIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>↖</span>;
export const DoubleArrowUpIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>⇑</span>;
export const DoubleArrowDownIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>⇓</span>;
export const DoubleArrowLeftIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>⇐</span>;
export const DoubleArrowRightIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>⇒</span>;
export const RefreshIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>↻</span>;
export const SyncIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>↺</span>;

// Currency Symbols
export const DollarIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>$</span>;
export const EuroIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>€</span>;
export const PoundIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>£</span>;
export const YenIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>¥</span>;
export const RupeeIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>₹</span>;
export const BitcoinIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>₿</span>;
export const CentIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>¢</span>;

// Punctuation & Editorial
export const QuotesIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>"</span>;
export const BulletPointIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>•</span>;
export const EllipsisIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>…</span>;
export const CopyrightIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>©</span>;
export const TrademarkIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>™</span>;
export const RegisteredIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>®</span>;
export const ParagraphIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>¶</span>;
export const SectionIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>§</span>;

// Comparison & Logic
export const GreaterThanIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>{'>'}</span>;
export const LessThanIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>&lt;</span>;
export const GreaterEqualIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>≥</span>;
export const LessEqualIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>≤</span>;
export const NotEqualIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>≠</span>;
export const ApproximateIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>≈</span>;
export const InfinityIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>∞</span>;

// Checkboxes & Controls
export const CheckboxIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>☐</span>;
export const CheckboxCheckedIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>☑</span>;
export const RadioButtonIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>○</span>;
export const RadioButtonSelectedIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>●</span>;
export const ToggleOnIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>⦿</span>;
export const ToggleOffIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>⦾</span>;

// Math & Science
export const SummationIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>∑</span>;
export const SquareRootIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>√</span>;
export const PlusMinusIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>±</span>;
export const DegreeIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>°</span>;
export const MicroIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>µ</span>;
export const OhmIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>Ω</span>;
export const DeltaIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>Δ</span>;
export const PiIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>π</span>;

// Shapes
export const CircleIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>○</span>;
export const FilledCircleIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>●</span>;
export const SquareIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>□</span>;
export const FilledSquareIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>■</span>;
export const TriangleIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>△</span>;
export const FilledTriangleIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>▲</span>;
export const DiamondShapeIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>◇</span>;
export const FilledDiamondIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>◆</span>;
export const HexagonIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>⬡</span>;
export const FilledHexagonIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>⬢</span>;
export const StarShapeIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>☆</span>;
export const FilledStarIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>★</span>;

// Weather & Time
export const SunIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>☀</span>;
export const MoonIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>☽</span>;
export const CloudIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>☁</span>;
export const UmbrellaIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>☂</span>;
export const SnowflakeIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>❄</span>;
export const WatchIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>⌚</span>;
export const SandglassIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>⌛</span>;

// Music & Media
export const MusicNoteIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>♪</span>;
export const DoubleNoteIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>♫</span>;
export const PlayIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>▶</span>;
export const PauseIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>⏸</span>;
export const StopIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>⏹</span>;
export const RecordIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>⏺</span>;
export const FastForwardIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>⏩</span>;
export const RewindIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>⏪</span>;
export const VolumeIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🔊</span>;
export const MuteIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🔇</span>;

// User Interface
export const MenuIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>☰</span>;
export const MoreIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>⋮</span>;
export const MoreHorizontalIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>⋯</span>;
export const HomeIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>⌂</span>;
export const SearchGlassIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>⚲</span>;
export const SettingsGearIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>⚙</span>;
export const PowerIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>⏻</span>;
export const WiFiIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>⋮⋰⋮</span>;
export const BluetoothIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>ᛒ</span>;
export const BatteryIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🔋</span>;
export const BatteryLowIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🪫</span>; 