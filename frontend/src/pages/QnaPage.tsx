// src/components/QnAPage.tsx
import React, { useMemo, useState } from "react";
import { Copy, Link2, ChevronDown, ChevronUp, Search } from "lucide-react";

type QA = {
  id: string;
  question: string;
  answer: string;
};

const QA_ITEMS: QA[] = [
  {
    id: "q1",
    question: "1. How reliable are the predictions?",
    answer:
      `Our model does not rely on a single sensor. It cross-checks multiple sensor inputs (like displacement, pore pressure, vibration) before raising an alert. ` +
      `This multi-sensor validation significantly improves reliability and reduces false positives.`,
  },
  {
    id: "q2",
    question: "2. How do I see the current slope condition?",
    answer:
      `We provide a real-time dashboard accessible via any device. Live sensor readings are displayed. ` +
      `Risk is shown in color codes:\n\n🟢 Green = Stable\n🟡 Yellow = Warning (watch zone)\n🔴 Red = Critical (immediate action)`,
  },
  {
    id: "q3",
    question: "3. How is this different from existing safety monitoring systems?",
    answer:
      `Current systems are mostly threshold-based → they warn only after movement has started. ` +
      `Our system is predictive → it learns from sensor patterns that usually occur before failure, giving earlier warnings and more time for preventive action.`,
  },
  {
    id: "q4",
    question: "4. What happens if the network or power goes down in the mine?",
    answer:
      `The IoT gateway is equipped with edge processing + local storage. If internet drops, local sirens/SMS alerts still work. ` +
      `Data is buffered locally and synced when connection is back. Sensors are solar-powered with battery backup, so power cuts don’t stop monitoring.`,
  },
  {
    id: "q5",
    question: "5. How do you ensure the system doesn’t raise false alarms?",
    answer:
      `We use a multi-sensor validation + ML filtering approach: Alerts are raised only when multiple sensors confirm abnormality in the same zone. ` +
      `The ML model is trained on historical landslide/rockfall patterns, which reduces random noise. ` +
      `Engineers can set custom thresholds in the dashboard for added control.`,
  },
  {
    id: "q6",
    question: "6. What if there is a sudden natural event (like heavy rain or earthquake) causing instant rockfall?",
    answer:
      `No system can stop sudden forces of nature. But our system still provides real-time alerts from sensors, giving workers critical seconds to evacuate and reduce casualties.`,
  },
];

const QnAPage: React.FC = () => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return QA_ITEMS;
    return QA_ITEMS.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
    );
  }, [query]);

  function toggle(id: string) {
    setOpenIds((s) => ({ ...s, [id]: !s[id] }));
  }

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      // small visual confirm could be added
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
  }

  function copyLink(id: string) {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    copyText(url);
  }

  return (
    <div className="p-6 bg-background min-h-screen text-foreground space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">FAQ — Rockfall Predictor</h1>
          <p className="text-sm text-muted-foreground">
            Common questions about reliability, alerts and failure modes.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions or answers..."
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-border bg-card text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            onClick={() => {
              setQuery("");
              setOpenIds({});
            }}
            className="px-3 py-2 rounded-md border border-border bg-card text-card-foreground"
          >
            Reset
          </button>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: list */}
        <section className="col-span-2 space-y-4">
          {filtered.length === 0 && (
            <div className="p-4 rounded-lg border border-border bg-card text-card-foreground">
              <div className="text-sm text-muted-foreground">No results for your search.</div>
            </div>
          )}

          {filtered.map((item) => {
            const isOpen = !!openIds[item.id];
            return (
              <article
                id={item.id}
                key={item.id}
                className="rounded-xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden"
              >
                <button
                  aria-expanded={isOpen}
                  onClick={() => toggle(item.id)}
                  className="w-full flex items-start justify-between gap-3 p-4"
                >
                  <div className="text-left">
                    <div className="text-sm text-muted-foreground">{item.id.toUpperCase()}</div>
                    <h3 className="text-lg font-semibold text-foreground">{item.question}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyLink(item.id);
                      }}
                      title="Copy link"
                      className="p-2 rounded-md hover:bg-background/50"
                    >
                      <Link2 className="w-4 h-4 text-muted-foreground" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyText(item.answer);
                      }}
                      title="Copy answer"
                      className="p-2 rounded-md hover:bg-background/50"
                    >
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    </button>

                    <span className="p-2 rounded-md">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <div className="p-4 border-t border-border bg-background/50">
                    <pre className="whitespace-pre-wrap text-sm text-foreground leading-relaxed">
                      {item.answer}
                    </pre>
                  </div>
                )}
              </article>
            );
          })}
        </section>

        {/* Right column: summary / quick reference */}
        <aside className="space-y-4">
          <div className="p-4 rounded-lg border border-border bg-card text-card-foreground">
            <h4 className="font-semibold text-foreground">Risk Legend</h4>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li>🟢 <span className="text-foreground font-medium">Green</span> — Stable</li>
              <li>🟡 <span className="text-foreground font-medium">Yellow</span> — Warning</li>
              <li>🔴 <span className="text-foreground font-medium">Red</span> — Critical</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg border border-border bg-card text-card-foreground">
            <h4 className="font-semibold text-foreground">Quick tips</h4>
            <ol className="mt-2 text-sm text-muted-foreground space-y-2 list-decimal list-inside">
              <li>Use search to find specific sensors or keywords.</li>
              <li>Copy answers or links to share with field engineers.</li>
              <li>The dashboard shows live sensor readings and color-coded risk levels.</li>
            </ol>
          </div>


        </aside>
      </main>
    </div>
  );
};

export default QnAPage;
