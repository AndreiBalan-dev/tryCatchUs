import React from 'react'

interface GetAthletesPlaceholderProps {
    countries: string[],
    sports: string[]
}

const TokyoOlympicsAnalysis = async () => {
  // server component by default so this content would be prerendered on the server, no need to use the useEffect hook,
  // if needs to fetch on client, then useEffect hook would be used, aim is to generate most content on server
  // and only what is needed on the client by nesting client components inside server components, as any server component
  // if nested inside a client component would automatically be converted to a client component and render on client
  const resp = await fetch(`http://localhost:8000/2021/get/athletes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
        "sport": "Boxing",
        "country": "Japan"
    }
  });
  const data: GetAthletesPlaceholderProps = await resp.json();
  return (
    <div className='flex h-full items-center justify-center'>
        <select>
            <option value={-1}>-- Select a Country --</option>
            {data.countries.map((country, index) => {
                return <option key={index} value={country}>{country}</option>
            })}
        </select>
    </div>
  )
}

export default TokyoOlympicsAnalysis