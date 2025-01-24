import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

// Use the world-atlas TopoJSON file hosted on jsDelivr
const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const ExportCountryMap = ({ countries }) => {
  return (
    <div className="w-full h-[300px] mt-2">
      <ComposableMap projection="geoMercator">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              // Check if the country is in the list of exported countries
              const isHighlighted = countries.includes(geo.properties.iso_a2);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isHighlighted ? '#3b82f6' : '#D6D6DA'}
                  stroke="#FFFFFF"
                  style={{
                    default: {
                      outline: 'none',
                    },
                    hover: {
                      fill: isHighlighted ? '#2563eb' : '#D6D6DA',
                      outline: 'none',
                    },
                    pressed: {
                      outline: 'none',
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default ExportCountryMap;