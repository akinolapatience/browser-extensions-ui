import styles from "@/styles/extensions.module.css";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function Extensions() {
  const [filter, setFilter] = useState(null);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("color-scheme", theme);
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const _extensions = [
    {
      id: 1,
      name: "DevLens",
      description:
        "Quickly inspect page layouts and visualize element boundaries.",
      active: true,
    },
    {
      id: 2,
      name: "StyleSpy",
      description: "Instantly analyse and copy CSS from any web page element.",
      active: true,
    },
    {
      id: 3,
      name: "SpeedBoost",
      description:
        "Optimizes browser resource usage to accelerate page loading",
      active: true,
    },
    {
      id: 4,
      name: "JSONWizard",
      description:
        "Formats, validates, and prettifies JSON responses in-browser",
      active: true,
    },
    {
      id: 5,
      name: "TabMaster Pro",
      description: "Organizes browser tabs into groups and sessions",
      active: true,
    },
    {
      id: 6,
      name: "ViewportBuddy",
      description: "Simulates screen resolutions directly in the browser",
      active: false,
    },
    {
      id: 7,
      name: "Markup Notes",
      description: "Add notes to webpages for collaborative debugging",
      active: true,
    },
    {
      id: 8,
      name: "GridGuides",
      description: "Overlay customizable grids and guides",
      active: false,
    },
    {
      id: 9,
      name: "Palette Picker",
      description: "Extract color palettes from webpages",
      active: false,
    },
    {
      id: 10,
      name: "LinkChecker",
      description: "Scan and highlight broken links",
      active: true,
    },
    {
      id: 11,
      name: "DOM Snapshot",
      description: "Capture and export DOM structures",
      active: false,
    },
    {
      id: 12,
      name: "ConsolePlus",
      description: "Advanced developer console with logging",
      active: true,
    },
    {
      id: 13,
      name: "Add New Extension",
      description: "Click here to add new extensions",
    },
  ];

  const [extensions, setExtensions] = useState(_extensions);

  const filterObject = {
    All: null,
    Active: true,
    Inactive: false,
  };

  return (
    <>
      <div className={styles.container}>
        <header className={styles.headercontainer}>
          <input
            type="text"
            className={styles.extention_search}
            placeholder="Search extensions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={toggleTheme}
            className={styles.iconButton}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setShowModal(true)}>Add New Extension</button>
        </header>

        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <span
                className={styles.closeButton}
                onClick={() => setShowModal(false)}
              >
                &times;
              </span>
              <input
                type="text"
                placeholder="Extension Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Extension Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button
                onClick={() => {
                  if (name && description) {
                    setExtensions((prev) => [
                      ...prev,
                      {
                        id: prev.length + 1,
                        name,
                        description,
                        active: true,
                      },
                    ]);
                    setName("");
                    setDescription("");
                    setShowModal(false);
                  } else {
                    alert("Please fill in both fields.");
                  }
                }}
              >
                Add Extension
              </button>
            </div>
          </div>
        )}

        <section className={styles.filters}>
          {["All", "Active", "Inactive"].map((type) => (
            <button
              key={type}
              className={filter === type ? styles.activeFilter : ""}
              style={{
                backgroundColor: filterObject[type] === filter ? "#b91c1c" : "",
                color: filterObject[type] === filter ? "#fff" : "#000",
              }}
              onClick={() =>
                setFilter(
                  type === "All" ? null : type === "Active" ? true : false
                )
              }
            >
              {type}
            </button>
          ))}
        </section>

        <section className={styles["extensions-list"]}>
          {extensions
            .filter(
              (ext) =>
                (ext.name + ext.description)
                  .toLowerCase()
                  .includes(search.toLowerCase()) &&
                (filter === null || filter === ext.active)
            )
            .map((ext, index) => (
              <div key={index} className={styles["extension-card"]}>
                <div className={styles["extension-info"]}>
                  <h2>{ext.name}</h2>
                  <p>{ext.description}</p>
                </div>
                <div className={styles["extension-controls"]}>
                  <button
                    onClick={() => {
                      const confirmed = window.confirm(
                        "Are you sure you want to remove this extension?"
                      );
                      if (confirmed) {
                        setExtensions((prev) =>
                          prev.filter((item) => item.id !== ext.id)
                        );
                      }
                    }}
                  >
                    Remove
                  </button>

                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={ext.active}
                      onChange={(e) => {
                        setExtensions((prev) =>
                          prev.map((item) =>
                            item.id === ext.id
                              ? { ...item, active: e.target.checked }
                              : item
                          )
                        );
                      }}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>
            ))}
        </section>
      </div>
    </>
  );
}
