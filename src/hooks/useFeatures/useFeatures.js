import { useEffect, useState } from 'react';

import FetchData from '../../service/FetchData';

const fetchData = new FetchData();

const useFeatures = (rocket) => {
    const [rocketFeatures, setRocketFeatures] = useState([]);

    useEffect(() => {
        fetchData
            .getRocket()
            .then((data) =>
                data.find(
                    (item) =>
                        item.name.replace(' ', '_').toLowerCase() === rocket,
                ),
            )
            .then((rocketFeatures) => setRocketFeatures({ ...rocketFeatures }));
    }, [rocket]);

    return { rocketFeatures };
};

export default useFeatures;