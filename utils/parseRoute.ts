import { parseString } from 'xml2js';

interface Coordinate {
    lat: number;
    lng: number;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const getRoute = async (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
        throw new Error('File size exceeds the maximum allowed size. (5 MB)');
    }

    const extension = file.name.split('.').pop()?.toLowerCase();
    if (extension !== 'gpx' && extension !== 'kml') {
        throw new Error('Invalid file format. Please upload a GPX or KML file.');
    }

    const fileContent = await readFileContent(file);

    const result = await parseXML(fileContent);

    if (extension === 'gpx') {
        return parseGPX(result);
    } else {
        return parseKML(result);
    }
};

const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target?.result as string);
        reader.onerror = () => reject(new Error('Failed to read file.'));
        reader.readAsText(file);
    });
};

const parseXML = (content: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        parseString(content, (err, result) => {
            if (err) {
                reject(new Error('Error parsing XML: ' + err.message));
            } else {
                resolve(result);
            }
        });
    });
};


const parseGPX = (doc: any): Coordinate[] => {
    const coordinates: Coordinate[] = [];

    const trkpts = doc.gpx.trk[0].trkseg[0].trkpt;

    for (const trkpt of trkpts) {
        const lat = parseFloat(trkpt.$.lat);
        const lon = parseFloat(trkpt.$.lon);

        if (!isNaN(lat) && !isNaN(lon)) {
            coordinates.push({ lat, lng: lon });
        }
    }

    if (coordinates.length === 0) {
        throw new Error('No valid track points found in the GPX file.');
    }

    return coordinates;
};

const parseKML = (doc: any): Coordinate[] => {
    const coordinates: Coordinate[] = [];
    const placemarks = doc.kml.Document[0].Placemark;

    for (const placemark of placemarks) {
        if (placemark.Point) {
            const [lng, lat] = placemark.Point[0].coordinates[0].split(',').map(parseFloat);
            if (!isNaN(lat) && !isNaN(lng)) {
                coordinates.push({ lat, lng });
            }
        } else if (placemark.LineString) {
            const coordinatesString = placemark.LineString[0].coordinates[0];
            const coordinatePairs = coordinatesString.trim().split(/\s+/);

            for (const pair of coordinatePairs) {
                const [lng, lat] = pair.split(',').map(parseFloat);
                if (!isNaN(lat) && !isNaN(lng)) {
                    coordinates.push({ lat, lng });
                }
            }
        }
    }

    if (coordinates.length === 0) {
        throw new Error('No valid coordinates found in the KML file.');
    }

    return coordinates;
};

export { getRoute };