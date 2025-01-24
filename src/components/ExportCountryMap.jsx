import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import * as topojson from 'topojson-client';
import { Tooltip as ReactTooltip } from 'react-tooltip';

const ExportCountryMap = ({ countries }) => {
  const normalizedCountries = Array.isArray(countries) ? countries.map(code => code.toUpperCase()) : [];

  // Fetch the world dataset with ISO Alpha-3 codes
  const [features, setFeatures] = React.useState([]);

  React.useEffect(() => {
    fetch("https://cdn.jsdelivr.net/npm/visionscarto-world-atlas@0.1.0/world/110m.json")
      .then(response => response.json())
      .then(data => {
        const worldFeatures = topojson.feature(data, data.objects.countries);
        setFeatures(worldFeatures.features);
      })
      .catch(error => console.error('Error fetching world data:', error));
  }, []);

  return (
    <div className="w-full h-[60vh]">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 150,
          center: [0, 30]
        }}
      >
        <Geographies geography={features}>
          {({ geographies }) => 
            geographies?.map((geo) => {
              const isHighlighted = normalizedCountries.includes(geo.properties.a3); // Use `a3` for ISO Alpha-3
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isHighlighted ? '#3b82f6' : '#D6D6DA'}
                  stroke="#FFFFFF"
                  strokeWidth={0.5}
                  style={{
                    default: {
                      outline: 'none',
                      pointerEvents: 'all', // Ensure the element can receive hover events
                    },
                    hover: {
                      fill: isHighlighted ? '#2563eb' : '#F5F4F6',
                      outline: 'none',
                    },
                    pressed: {
                      outline: 'none',
                    },
                  }}
                  data-tooltip-id="country-tooltip"
                  data-tooltip-content={geo.properties.name} // Set tooltip content
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <ReactTooltip id="country-tooltip" /> {/* Render the tooltip */}
    </div>
  );
};

export default ExportCountryMap;