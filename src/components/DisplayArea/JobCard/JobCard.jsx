import "./style.css"

function JobCard({ job }) {
   return (
    <div className="job-card">
      <div className="job-card__header">
        <h3 className="job-card__title">{job.title}</h3>
        <span className="job-card__company">
          {job.Employer?.company_name || "Companie necunoscută"}
        </span>
      </div>

      {job.description && (
        <p className="job-card__desc">
          {job.description.length > 140 ? job.description.slice(0, 140) + "…" : job.description}
        </p>
      )}

      <div className="job-card__footer">
        <span className="job-card__tag">
          {job.industry?.industry || "General"}
        </span>
      </div>
    </div>
  );
}

export default JobCard;