import { useEffect,useState } from "react";
import {apiGet} from "../../lib/api";
import ContributorCard from "../../components/ContributorCard/ContributorCard";

function Contributor() {

    const [contributors, setGetContributors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const data = await apiGet("/cvs");
                setGetContributors(data);
            } catch (e) {
                setError(`Eroare la încărcarea contributorilor: ${e.message}`);
            } finally {
                setLoading(false);
            }
        }   )();
    }, []);


    return (
        <div>
            <h1>Contributor Page</h1>
            <p>Welcome to the Contributor page! Here you can find information about how to contribute to the projects of the community.</p>
            <p>As a contributor, you can help us by submitting solutions, suggesting new features.In exchange you will be renumerated. We appreciate any help you can provide!</p>
            <p>To get started, please check out our contribution guidelines and join our community forums to connect with other contributors.</p>

        <div>
            <h2>Top Contributors</h2>
            <p>Here are some of our top contributors:</p>
            {loading && <p>Loading contributors...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && contributors.length === 0 && <p>No contributors found.</p>}
            <div>
                {contributors.map((contributor) => (
                    <ContributorCard key={contributor.id} contributor={contributor} />
                ))}
            </div>
        </div>

        </div>


    );
}

export default Contributor