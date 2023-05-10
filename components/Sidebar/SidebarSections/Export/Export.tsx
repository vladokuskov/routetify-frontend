import { useAppSelector } from '@/redux/hooks';
import { useState } from 'react';
import downloadjs from 'downloadjs';
import { DrawCoords } from '@/types/models/drawCoords.types';
import { StyledSidebarSectionContent } from '../../SidebarSection/SidebarSection.styles';
import { Button } from '@/components/Button/Button';

const date = new Date();
const current_date = `${date.getFullYear()}-${
  date.getMonth() + 1
}-${date.getDate()}_${date.getHours()}:${date.getMinutes()}`;

enum ExportType {
  none,
  gpx,
  kml,
}

const Export = () => {
  const exportCoords = useAppSelector(
    (state) => state.drawReducer.exportCoords
  );

  const [filename, setFilename] = useState<string>('');

  // Function that generate gpx file with dynamic filenames and coords
  const generateGPX = async (coords: DrawCoords[]) => {
    let gpx = `<?xml version="1.0" encoding="UTF-8"?>
  <gpx xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.topografix.com/GPX/1/1" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd http://www.topografix.com/GPX/gpx_style/0/2 http://www.topografix.com/GPX/gpx_style/0/2/gpx_style.xsd" xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1" xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3" xmlns:gpx_style="http://www.topografix.com/GPX/gpx_style/0/2" version="1.1" creator="https://cycroute.netlify.app/">
  <metadata>
    <name>${
      filename.length === 0 || !filename
        ? `new_route_${current_date}`
        : filename
    }</name>
  <author>
    <name>cycroute</name>
    <link href="https://cycroute.netlify.app/"></link>
  </author>
  </metadata>
  <trk>
    <name>${
      filename.length === 0 || !filename
        ? `new_route_${current_date}`
        : filename
    }</name>
    <type>Cycling</type>
    <trkseg>`;

    coords.forEach((coord) => {
      gpx += `
      <trkpt lat="${coord.lat}" lon="${coord.lng}"></trkpt>`;
    });

    gpx += `
    </trkseg>
    </trk>
  </gpx>`;

    return gpx;
  };

  const generateKML = async (coords: DrawCoords[]) => {
    let kml = `<?xml version="1.0" encoding="UTF-8"?>
    <kml xmlns="http://www.opengis.net/kml/2.2">
      <Document>
        <name>${
          filename.length === 0 || !filename
            ? `new_route_${current_date}`
            : filename
        }</name>
        <Placemark>
          <name>Start</name>
          <description>Start Waypoint</description>
          <Point>
            <coordinates>${coords[0].lng},${coords[0].lat},0</coordinates>
          </Point>
        </Placemark>
        <Placemark>
          <name>End</name>
          <description>End Waypoint</description>
          <Point>
            <coordinates>${coords[coords.length - 1].lng},${
      coords[coords.length - 1].lat
    },0</coordinates>
          </Point>
        </Placemark>
        <Placemark>
          <name>${
            filename.length === 0 || !filename
              ? `new_route_${current_date}`
              : filename
          }</name>
          <LineString>
            <tessellate>1</tessellate>
            <coordinates>`;

    coords.forEach((coord, index: number) => {
      kml += `${coord.lng},${coord.lat},0 `;
    });

    kml += `
        </coordinates>
      </LineString>
    </Placemark>
  </Document>
</kml>`;

    return kml;
  };

  const handleGpxDownload = async () => {
    const gpx = await generateGPX(exportCoords);

    downloadjs(
      gpx,
      `${
        filename.length === 0 || !filename
          ? `new_route_${current_date}`
          : filename
      }.gpx`,
      'application/gpx+xml'
    );
  };

  const handleKmlDownload = async () => {
    const kml = await generateKML(exportCoords);

    downloadjs(
      kml,
      `${
        filename.length === 0 || !filename
          ? `new_route_${current_date}`
          : filename
      }.kml`,
      'application/vnd.google-earth.kml+xml'
    );
  };

  return (
    <StyledSidebarSectionContent>
      <Button
        variant="iconWithText"
        text="GPX"
        onClick={handleGpxDownload}
        full="true"
        isDisabled={exportCoords.length === 0 ? 'true' : 'false'}
      />
      <Button
        variant="iconWithText"
        text="KML"
        onClick={handleKmlDownload}
        full="true"
        isDisabled={exportCoords.length === 0 ? 'true' : 'false'}
      />
    </StyledSidebarSectionContent>
  );
};

export { Export };
