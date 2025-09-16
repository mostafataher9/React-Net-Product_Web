import React, { useEffect, useRef } from "react";
import {Navbar} from "../../Components/Navbar";
const SCRIPT_SRC = "https://public.tableau.com/javascripts/api/tableau-2.min.js";
const VIZ_URL = "https://public.tableau.com/views/Product_Shop_Dashboard/Dashboard1?:showVizHome=no&:embed=y";


export function TableauDashboard({ url = VIZ_URL, height = 800 }) {
  const containerRef = useRef(null);
  const vizRef = useRef(null);

  useEffect(() => {
    let scriptEl;

    const initViz = () => {
      if (!containerRef.current || vizRef.current || !window.tableau) return;
      const options = { width: "100%", height: `${height}px`, textAlign: "center", justify: "center" };
      vizRef.current = new window.tableau.Viz(containerRef.current, url, options);
    };

    if (!window.tableau) {
      scriptEl = document.createElement("script");
      scriptEl.src = SCRIPT_SRC;
      scriptEl.async = true;
      scriptEl.onload = initViz;
      document.body.appendChild(scriptEl);
    } else {
      initViz();
    }

    return () => {
      if (vizRef.current) {
        try { vizRef.current.dispose(); } catch {}
        vizRef.current = null;
      }
      if (scriptEl && scriptEl.parentNode) {
        // Keep script in DOM for reuse across mounts; remove only if needed
      }
    };
  }, [url, height]);

  return (
    <>
      <section>
        <Navbar />
      </section>
      <section>
        <h2 style={{ fontWeight: "bold", textAlign: "center"}}>Products_Shop_Dashboard</h2>
        <div ref={containerRef} style={{ width: "100%", height: `${height}px` }} />
      </section>
    </>
  );
}
