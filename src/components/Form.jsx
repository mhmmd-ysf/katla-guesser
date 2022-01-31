import React, { useState } from 'react';

export default function Form() {
  const [awalan, setAwalan] = useState('');
  const [akhiran, setAkhiran] = useState('');
  const [sedia, setSedia] = useState('');

  console.log(awalan, akhiran, sedia);
  return (
    <div className="p-5">
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="awalan">
            Awalan
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="awalan"
            type="text"
            placeholder="MAK(AN)"
            onChange={ e => setAwalan(e.target.value) }
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="akhiran">
            Akhiran
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="akhiran"
            type="text"
            placeholder="(MA)KAN"
            onChange={ e => setAkhiran(e.target.value) }
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="tersedia">
            Huruf Tersedia
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="tersedia"
            type="text"
            placeholder="MKN"
            onChange={ e => setSedia(e.target.value) }
          />
        </div>
      </div>
    </div>
  );
}
