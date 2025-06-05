import React from 'react';

// Business Icons Component
// This file contains a collection of business-appropriate icons that can be used as text components
// Each icon is a functional component that returns the icon as a span element
// Usage: <EmailIcon className="text-2xl text-blue-500" />

interface IconProps {
  className?: string;
}

// Communication Icons
export const EmailIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>📧</span>;
export const PhoneIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>📱</span>;
export const MessageIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>💬</span>;
export const ChatIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🗨️</span>;
export const VideoCallIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🎥</span>;
export const MegaphoneIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>📢</span>;
export const MailboxIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>📫</span>;

// Office & Work Icons
export const BriefcaseIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>💼</span>;
export const DesktopIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🖥️</span>;
export const LaptopIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>💻</span>;
export const PrinterIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🖨️</span>;
export const FileIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>📄</span>;
export const FolderIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>📁</span>;
export const PaperclipIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>📎</span>;
export const ClipboardIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>📋</span>;
export const CalendarIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>📅</span>;

// Financial Icons
export const MoneyIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>💰</span>;
export const CurrencyIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>💲</span>;
export const ChartIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>📊</span>;
export const GraphIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>📈</span>;
export const DeclineIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>📉</span>;
export const CreditCardIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>💳</span>;
export const BankIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🏦</span>;
export const ReceiptIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🧾</span>;

// Meeting & Team Icons
export const HandshakeIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🤝</span>;
export const PeopleIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>👥</span>;
export const PersonIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>👤</span>;
export const TeamIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>👪</span>;
export const ClockIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🕒</span>;
export const AlarmIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>⏰</span>;
export const HourglassIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>⌛</span>;

// Building & Location Icons
export const BuildingIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🏢</span>;
export const FactoryIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🏭</span>;
export const LocationIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>📍</span>;
export const CompassIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🧭</span>;
export const GlobeIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🌐</span>;

// Travel & Transportation Icons
export const AirplaneIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>✈️</span>;
export const CarIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🚗</span>;
export const TrainIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🚄</span>;
export const ShipIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🚢</span>;
export const TruckIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🚚</span>;

// Productivity & Tasks Icons
export const CheckmarkIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>✅</span>;
export const CrossIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>❌</span>;
export const LightbulbIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>💡</span>;
export const GearIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>⚙️</span>;
export const ToolsIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🛠️</span>;
export const SearchIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🔍</span>;
export const KeyIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🔑</span>;
export const LockIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🔒</span>;
export const UnlockIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🔓</span>;
export const FlagIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🚩</span>;
export const PinIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>📌</span>;

// Content & Media Icons
export const DocumentIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>📃</span>;
export const BookIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>📕</span>;
export const NewsIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>📰</span>;
export const MicrophoneIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🎤</span>;
export const HeadphonesIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🎧</span>;
export const PresentationIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>📊</span>;

// Awards & Achievement Icons
export const TrophyIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🏆</span>;
export const MedalIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🏅</span>;
export const DiamondIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>💎</span>;
export const StarIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>⭐</span>;

// Alert & Info Icons
export const InfoIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>ℹ️</span>;
export const WarningIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>⚠️</span>;
export const AlertIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🚨</span>;
export const QuestionIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>❓</span>;

// Health & Wellness
export const HeartIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>❤️</span>;
export const ShieldIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🛡️</span>;

// Basic Symbols and Math
export const PlusSymbolIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>➕</span>;
export const MinusSymbolIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>➖</span>;
export const MultiplySymbolIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>✖️</span>;
export const DivideSymbolIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>➗</span>;
export const EqualsSymbolIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>=</span>;

// Technology & Devices
export const BatteryFullIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🔋</span>;
export const BatteryLowIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🪫</span>;
export const WifiIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>📶</span>;
export const NoWifiIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>📵</span>;
export const SignalIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>📶</span>;
export const NoSignalIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>📵</span>;
export const BluetoothIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🔵</span>;
export const CableIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🔌</span>;
export const KeyboardIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>⌨️</span>;
export const MouseIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🖱️</span>;
export const JoystickIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🕹️</span>;
export const GamepadIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🎮</span>;
export const DesktopComputerIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🖥️</span>;
export const TabletIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>📱</span>;
export const SmartphoneIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>📱</span>;
export const CameraIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>📷</span>;
export const VideoIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>📹</span>;
export const MovieIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>🎬</span>;
export const TelevisionIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>📺</span>;
export const RadioIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>📻</span>;
export const SatelliteIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>📡</span>;
export const DVDIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>📀</span>;
export const CDIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>💿</span>;
export const HDDIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>💽</span>;
export const UsbIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>💾</span>;
export const MemoryIcon: React.FC<IconProps> = ({ className = '' }) => <span className={className}>💾</span>; 