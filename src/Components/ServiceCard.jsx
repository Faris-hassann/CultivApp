import { 
  CurrencyDollarIcon, 
  ArrowsRightLeftIcon, 
  ChatBubbleLeftRightIcon, 
  BuildingOfficeIcon 
} from '@heroicons/react/24/outline';

const iconMap = {
  wallet: CurrencyDollarIcon,
  transfer: ArrowsRightLeftIcon,
  message: ChatBubbleLeftRightIcon,
  building: BuildingOfficeIcon
};

const ServiceCard = ({ service, onClick }) => {
  const IconComponent = iconMap[service.icon] || BuildingOfficeIcon;

  return (
    <div className="service-card bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 h-full">
      <div className="text-center h-full flex flex-col">
        {/* Icon */}
        <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 arabic-text">
          {service.nameAr}
        </h3>
        <h4 className="text-lg font-semibold text-gray-700 mb-4">
          {service.nameEn}
        </h4>
        
        {/* Description */}
        <p className="text-gray-600 mb-4 arabic-text text-sm leading-relaxed" dir="rtl">
          {service.descriptionAr}
        </p>
        <p className="text-gray-600 mb-8 text-sm leading-relaxed">
          {service.descriptionEn}
        </p>
        
        {/* CTA Button */}
        <div className="mt-auto">
          <button 
            onClick={() => onClick(service)}
            className="w-full px-6 py-3 bg-primary text-white rounded-xl hover:bg-blue-800 transition-all duration-200 font-semibold focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            {service.id === 'transfer' ? 'Click Here' : 'Click Here'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
