import React, { useState } from 'react';
import { 
  DocumentTextIcon, 
  BuildingOfficeIcon, 
  GlobeAltIcon, 
  TruckIcon,
  UserGroupIcon,
  CogIcon,
  ShieldCheckIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import ServiceFormModal from './ServiceFormModal';

const services = [
  {
    id: 1,
    title: 'Documentation & Certification',
    description: 'Complete document processing, translation, and government certification services for all business requirements.',
    icon: DocumentTextIcon,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    features: ['Document Translation', 'Government Stamping', 'Legal Certification', '24h Processing']
  },
  {
    id: 2,
    title: 'Government Services',
    description: 'Streamlined access to all Saudi government services including visas, permits, and regulatory compliance.',
    icon: BuildingOfficeIcon,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    features: ['Visa Processing', 'Work Permits', 'Business Licenses', 'Regulatory Compliance']
  },
  {
    id: 3,
    title: 'Commercial Registration',
    description: 'Complete business registration services including company formation and commercial licensing.',
    icon: GlobeAltIcon,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    features: ['Company Formation', 'Trade License', 'Tax Registration', 'Banking Setup']
  },
  {
    id: 4,
    title: 'Logistics & Shipping',
    description: 'End-to-end logistics solutions including customs clearance, warehousing, and distribution services.',
    icon: TruckIcon,
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    features: ['Customs Clearance', 'Warehousing', 'Distribution', 'Real-time Tracking']
  },
  {
    id: 5,
    title: 'HR & Recruitment',
    description: 'Comprehensive human resources services including recruitment, visa processing, and employee management.',
    icon: UserGroupIcon,
    color: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-50',
    features: ['Talent Acquisition', 'Visa Processing', 'Employee Onboarding', 'HR Compliance']
  },
  {
    id: 6,
    title: 'Technical Services',
    description: 'Specialized technical support including IT setup, equipment installation, and maintenance services.',
    icon: CogIcon,
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50',
    features: ['IT Infrastructure', 'Equipment Setup', 'Technical Support', 'Maintenance']
  },
  {
    id: 7,
    title: 'Compliance & Security',
    description: 'Comprehensive compliance and security services ensuring your business meets all regulatory requirements.',
    icon: ShieldCheckIcon,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    features: ['Security Audits', 'Compliance Checks', 'Risk Assessment', 'Legal Support']
  },
  {
    id: 8,
    title: 'Business Intelligence',
    description: 'Data-driven insights and market analysis to help you make informed business decisions in Saudi Arabia.',
    icon: ChartBarIcon,
    color: 'from-teal-500 to-teal-600',
    bgColor: 'bg-teal-50',
    features: ['Market Analysis', 'Data Insights', 'Performance Metrics', 'Strategic Planning']
  }
];

const getBorderColor = (gradient) => {
  // Extract the first color from the gradient string (e.g., 'from-blue-500 to-blue-600')
  // and convert it to a Tailwind color code or fallback to a default
  if (!gradient) return '#2563eb'; // fallback blue
  const match = gradient.match(/from-([\w-]+)/);
  if (!match) return '#2563eb';
  // Map some common tailwind colors to hex for border
  const colorMap = {
    'blue-500': '#3b82f6',
    'green-500': '#22c55e',
    'purple-500': '#a21caf',
    'orange-500': '#f97316',
    'pink-500': '#ec4899',
    'indigo-500': '#6366f1',
    'red-500': '#ef4444',
    'teal-500': '#14b8a6',
  };
  const colorKey = match[1];
  return colorMap[colorKey] || '#2563eb';
};

const ServicesGrid = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedService(null);
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container-modern">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Services
          </div>
          <h2 className="text-gradient mb-4">
            Comprehensive Solutions for Your Business
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From initial setup to ongoing operations, we provide end-to-end logistics and business 
            services that ensure your success in the Saudi Arabian market.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="card card-hover p-6 h-full group slide-up relative overflow-hidden cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleServiceClick(service)}
            >
              {/* Service Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <service.icon className="w-6 h-6 text-white" />
              </div>

              {/* Service Content */}
              <div className="space-y-3 group-hover:transform group-hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Features List */}
              <div className="mt-6 space-y-2 opacity-0 group-hover:opacity-100 group-hover:transform group-hover:translate-y-0 transform translate-y-4 transition-all duration-300">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2">
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`} />
                    <span className="text-xs text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-35 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 slide-up">
          <div className="card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our team of experts can create tailored solutions to meet your specific business requirements 
              and ensure seamless operations in Saudi Arabia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary">
                Get Custom Quote
              </button>
              <button className="btn btn-outline">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {[
            { number: '500+', label: 'Companies Served' },
            { number: '99%', label: 'Success Rate' },
            { number: '24h', label: 'Response Time' },
            { number: '50+', label: 'Expert Team' }
          ].map((stat, index) => (
            <div key={index} className="text-center scale-in" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Service Form */}
        {selectedService && (
          <ServiceFormModal
            open={modalOpen}
            onClose={handleCloseModal}
            title={selectedService.title}
            borderColor={getBorderColor(selectedService.color)}
          />
        )}
      </div>
    </section>
  );
};

export default ServicesGrid;
