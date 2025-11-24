import React from 'react';
import { useNavigate } from 'react-router-dom';
import SOFIcon from '../../assets/images/SOFIcon.webp';
import AnonyIcon from '../../assets/images/AnonyIcon.webp';
import FirstIcon from '../../assets/images/FirstIcon.webp';
import BulkIcon from '../../assets/images/BulkIcon.webp';
import CustomIcon from '../../assets/images/CustomIcon.webp';
import Icon15min from '../../assets/images/15minIcon.webp';

interface Service {
  id: string;
  name: string;
  icon: string;
  description: string;
  route: string;
  buttonText: string;
}

const services: Service[] = [
  {
    id: '1',
    name: 'Seamless Online Filing',
    icon: SOFIcon,
    description: 'File RTI applications to Telangana Government departments online easily with expert drafting, submission, and timely dispatch.',
    route: '/services/seamless-online-filing',
    buttonText: 'File Now',
  },
  {
    id: '2',
    name: 'Anonymous RTI Filing',
    icon: AnonyIcon,
    description: 'Protect your identity with our discreet service for filing RTI applications to Telangana departments on your behalf.',
    route: '/services/anonymous',
    buttonText: 'Start Anonymously',
  },
  {
    id: '3',
    name: 'Online First Appeal Filing',
    icon: FirstIcon,
    description: 'File your First Appeal online with expert drafting, review, and quick submission for Telangana RTI cases.',
    route: '/services/1st-appeal',
    buttonText: 'Appeal Now',
  },
  {
    id: '4',
    name: 'Efficient Bulk RTI Filing',
    icon: BulkIcon,
    description: 'Manage and submit multiple RTI applications efficiently to Telangana departments with our professional bulk service.',
    route: '/services/bulk',
    buttonText: 'Request Quote',
  },
  {
    id: '5',
    name: 'Custom RTI',
    icon: CustomIcon,
    description: 'Can\'t find the right RTI? Create a personalized application designed for your exact information need from Telangana departments.',
    route: '/services/custom-rti',
    buttonText: 'Custom RTI',
  },
  {
    id: '6',
    name: '15 min RTI Consultation',
    icon: Icon15min,
    description: 'Get personalized advice from legal experts to navigate complex RTI applications effectively for Telangana departments.',
    route: '/services/15-minute-consultation',
    buttonText: 'Pay Now',
  },
];

export const TelanganaServicesGrid: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
      <div className="container-responsive max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our RTI Services for Telangana
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the service that best fits your information needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-7 lg:p-8 hover:shadow-lg hover:border-primary-400 transition-all duration-200 flex flex-col h-full"
            >
              <div className="flex flex-col items-center text-center h-full">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-blue-50 flex items-center justify-center">
                    <img
                      src={service.icon}
                      alt={service.name}
                      className="h-10 w-10 md:h-12 md:w-12 object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="mt-2 mb-1 text-lg md:text-xl font-semibold text-gray-900">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-1 mb-4 flex-grow">
                  {service.description}
                </p>

                {/* Button */}
                <div className="mt-auto w-full">
                  <button
                    onClick={() => navigate(service.route)}
                    className="w-full px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    {service.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

