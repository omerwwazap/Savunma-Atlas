import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Military Projects Information</h1>
        <p className="text-xl text-gray-600 mb-8">Explore information on military projects around the world</p>
        <Link to="/projects">
          <Button>View Projects</Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
