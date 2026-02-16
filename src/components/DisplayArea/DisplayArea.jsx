import { useEffect, useState } from "react";
import { apiGet } from "../../lib/api";
import JobCard from "./JobCard/JobCard";
import "./styles.css";

function DisplayArea() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await apiGet("/jobs");
        setJobs(data);
      } catch (e) {
        setError(`Eroare la încărcarea joburilor: ${e.message}`);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="joblist__state">Se încarcă joburile…</div>;
  if (error) return <div className="joblist__state joblist__state--error">{error}</div>;
  if (!jobs.length) return <div className="joblist__state">Niciun job disponibil.</div>;

  return (
    <div className="joblist">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}


export default DisplayArea;
