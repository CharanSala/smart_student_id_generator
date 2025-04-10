import React, { useEffect, useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { toPng } from 'html-to-image';
import Navbar from './Navbar';

const IdCard = () => {
    const [student, setStudent] = useState(null);
    const cardRef = useRef(null);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('studentsData')) || [];
        if (data.length > 0) {
            setStudent(data[data.length - 1]); // Get latest submitted student
        }
    }, []);

    const downloadAsImage = () => {
        if (cardRef.current === null) return;

        toPng(cardRef.current)
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

    if (!student) return <p className="text-center mt-10">No student data found.</p>;

    return (
        <div>
          
            <div className="flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-white p-6" style={{ minHeight: 'calc(100vh - 64px)' }}>
                <div
                    ref={cardRef}
                    className="w-[270px] h-auto bg-white rounded-2xl shadow-2xl border border-black overflow-hidden"
                >
                    {/* Top Header */}
                    <div className="bg-black text-white text-center py-2">
                        <h2 className="text-xl font-bold tracking-wide">SMART ID CARD</h2>
                        <div className="bg-gray-800 text-xs py-1 mt-1 tracking-wider">SCAN FOR DETAILS</div>
                    </div>

                    {/* Body */}
                    <div className="px-4 py-5 flex flex-col items-center bg-white">
                        <img
                            src={student.photoPreview}
                            alt="Student"
                            className="w-28 h-28 rounded-full border-4 border-black object-cover shadow-sm"
                        />

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

                        {/* QR Code aligned to right */}
                        <div className="mt-4 w-full flex justify-end pr-2">
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
                </div>

                <button
                    onClick={downloadAsImage}
                    className="mt-6 bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
                >
                    Download as PNG
                </button>
            </div>
        </div>
    );
};

export default IdCard;
