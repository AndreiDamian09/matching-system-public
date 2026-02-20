import "./styles.css";
import { useEffect, useState, useMemo } from "react";
import { apiGet } from "../../lib/api";
import JobCard from "../../components/JobCard/JobCard";

// Categories based on industry types
const CATEGORIES = [
  "All Categories",
  "IT & Software",
  "Design & Creativitate",
  "Vânzări & Marketing",
  "Administrativ & Secretariat",
  "Financiar & Contabilitate",
  "Client Service & Support",
  "Educație",
  "Medicină & Sănătate",
];

const DIFFICULTY_LEVELS = ["All Levels", "Entry", "Mid", "Senior", "Expert"];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "salary_high", label: "Highest Salary" },
  { value: "salary_low", label: "Lowest Salary" },
];

function TaskBrowser() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Levels");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    (async () => {
      try {
        const data = await apiGet("/jobs");
        setJobs(data);
      } catch (e) {
        setError(`Error loading jobs: ${e.message}`);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (job) =>
          job.title?.toLowerCase().includes(query) ||
          job.description?.toLowerCase().includes(query) ||
          job.Employer?.company_name?.toLowerCase().includes(query) ||
          job.Skills?.some((skill) => skill.name?.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory !== "All Categories") {
      result = result.filter((job) => job.industry === selectedCategory);
    }

    // Difficulty/Experience filter
    if (selectedDifficulty !== "All Levels") {
      result = result.filter((job) => {
        const level = job.experience_level?.toLowerCase();
        const filter = selectedDifficulty.toLowerCase();
        return level?.includes(filter);
      });
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.created_at) - new Date(a.created_at);
        case "oldest":
          return new Date(a.created_at) - new Date(b.created_at);
        case "salary_high":
          return (b.salary_max || 0) - (a.salary_max || 0);
        case "salary_low":
          return (a.salary_min || Infinity) - (b.salary_min || Infinity);
        default:
          return 0;
      }
    });

    return result;
  }, [jobs, searchQuery, selectedCategory, selectedDifficulty, sortBy]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalTasks = filteredJobs.length;
    const avgBudget =
      filteredJobs.length > 0
        ? Math.round(
            filteredJobs.reduce(
              (sum, job) => sum + ((job.salary_min || 0) + (job.salary_max || 0)) / 2,
              0
            ) / filteredJobs.length
          )
        : 0;
    return { totalTasks, avgBudget };
  }, [filteredJobs]);

  if (loading) {
    return (
      <div className="task-browser">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="task-browser">
        <div className="error-container">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="task-browser">
      {/* Header */}
      <div className="browser-header">
        <div className="header-container">
          <h1 className="browser-title">Browse Available Tasks</h1>
          <p className="browser-subtitle">
            Find tasks that match your skills and start earning today
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="browser-content">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          <div className="filters-header">
            <svg
              className="filter-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
            </svg>
            <span>Filters</span>
          </div>

          <div className="filter-group">
            <label className="filter-label">Category</label>
            <select
              className="filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Difficulty</label>
            <select
              className="filter-select"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              {DIFFICULTY_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div className="quick-stats">
            <h3 className="stats-title">Quick Stats</h3>
            <div className="stat-item">
              <span className="stat-label">Total Tasks</span>
              <span className="stat-value">{stats.totalTasks}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Avg. Budget</span>
              <span className="stat-value">
                {stats.avgBudget > 0 ? `$${stats.avgBudget.toLocaleString()}` : "N/A"}
              </span>
            </div>
          </div>
        </aside>

        {/* Main Task List */}
        <main className="tasks-main">
          {/* Search and Sort Bar */}
          <div className="tasks-toolbar">
            <div className="search-container">
              <svg
                className="search-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Results Header */}
          <div className="results-header">
            <span className="results-count">
              Showing {filteredJobs.length} task{filteredJobs.length !== 1 ? "s" : ""}
            </span>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Task List */}
          <div className="tasks-list">
            {filteredJobs.length === 0 ? (
              <div className="no-results">
                <p>No tasks found matching your criteria.</p>
                <button
                  className="reset-filters-btn"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All Categories");
                    setSelectedDifficulty("All Levels");
                  }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default TaskBrowser;