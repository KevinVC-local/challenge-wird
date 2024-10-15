import { FaArrowLeft } from 'react-icons/fa';
import { Route, Routes, useNavigate } from 'react-router-dom';

interface Props {
  children: JSX.Element[] | JSX.Element;
}
function RoutesWithNotFound({ children }: Props) {

  const navigate = useNavigate();

  return (
    <Routes>
    
      {children}
      <Route path="*" element={<div className='flex flex-col'>Not Found
        <div className="flex items-center justify-center" onClick={() => navigate(-1)}>
      <FaArrowLeft />
      <p className="mr-3">Volver</p>
    </div>
      </div>} />
    </Routes>
  );
}
export default RoutesWithNotFound;
