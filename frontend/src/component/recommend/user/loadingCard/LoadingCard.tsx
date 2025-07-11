const LoadingCard: React.FC = () => (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded-full mb-3"></div>
        <div className="h-4 bg-gray-200 rounded-full mb-2 w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded-full mb-4 w-1/2"></div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div className="h-4 bg-gray-200 rounded-full w-16"></div>
          </div>
          <div className="flex space-x-2">
            <div className="h-8 bg-gray-200 rounded-full w-16"></div>
            <div className="h-8 bg-gray-200 rounded-full w-12"></div>
          </div>
        </div>
      </div>
    </div>
  );

export default LoadingCard