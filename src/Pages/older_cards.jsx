import React, { useEffect, useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import html2canvas from 'html2canvas';
import Navbar from './Navbar';
import { FaDownload } from 'react-icons/fa';
import domtoimage from 'dom-to-image';


const StudentCard = ({ student }) => {
  const cardRef = useRef(null);

  const handleDownload = async () => {
    if (cardRef.current === null) return;
  
    domtoimage.toPng(cardRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${student.name}_IDCard.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Image download failed:', err);
      });
  };
  

  return (
    <div>
    <div className="w-[270px] h-auto bg-white rounded-2xl shadow-2xl border border-black overflow-hidden" ref={cardRef}>
      {/* Top Header */}
      <div className="bg-black text-white text-center py-2">
        <h2 className="text-xl font-bold tracking-wide">SMART ID CARD</h2>
        <div className="bg-gray-800 text-xs py-1 mt-1 tracking-wider">SCAN FOR DETAILS</div>
      </div>

      {/* Body */}
      <div className="px-4 py-5 flex flex-col items-center bg-white">
        {/* Photo */}
        <img
          src={student.photoPreview}
          alt="Student"
          className="w-28 h-28 rounded-full border-4 border-black object-cover shadow-sm"
        />

        {/* Name and ID */}
        <h3 className="mt-3 text-lg font-bold text-black tracking-wide">{student.name}</h3>
        <h3 className="text-lg font-bold text-black tracking-wide">{student.rollNumber}</h3>
        <p className="text-sm font-medium tracking-wider text-gray-800">{student.id}</p>

        {/* Info Section */}
        <div className="text-left w-full text-sm text-black mt-4 space-y-1 pl-7 pr-7">
          <p className="flex justify-between">
            <span className="font-semibold">Class:</span>
            <span>{student.classDivision}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-semibold">Rack No:</span>
            <span>{student.rackNumber}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-semibold">Bus Route:</span>
            <span>{student.busRoute}</span>
          </p>
          {student.allergies.length > 0 && (
            <p className="flex justify-between">
              <span className="font-semibold">Allergies:</span>
              <span>{student.allergies.join(', ')}</span>
            </p>
          )}
        </div>

        {/* QR Code */}
        <div className="mt-4 w-full flex justify-start pl-6">
          <QRCodeCanvas
            value={JSON.stringify({
              id: student.id,
              name: student.name,
              roll: student.rollNumber,
            })}
            size={50}
            bgColor="#ffffff"
            fgColor="#000000"
            level="H"
            includeMargin={true}
          />
        </div>
      </div>

      {/* Download Button */}
      
    </div>
    <div className="-mt-14 mr-7 flex justify-end">
        <button
          onClick={handleDownload}
          className="bg-black hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-2xl transition duration-200"
        >
           <i className="fa fa-download"></i>
        </button>
      </div>
</div>
  );
};

const Older_cards = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('studentsData')) || [];
    setStudents(data);
  }, []);

  if (students.length === 0) {
    return <p className="text-center mt-10 text-gray-500">No older student ID cards found.</p>;
  }

  return (

      <div className="bg-gradient-to-br h-fit from-blue-100 to-white p-6">
        <h2 className="text-2xl font-bold text-center text-black mb-6">Older Student ID Cards</h2>

        <div className="flex flex-wrap gap-y-12 gap-6 justify-center min-h-screen">
          {students.map((student, index) => (
            <StudentCard key={index} student={student} />
          ))}
        </div>
      </div>
 
    
  );
};

export default Older_cards;
