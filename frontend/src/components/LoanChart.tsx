import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useEffect, useState } from "react";
import { getLoanRequests } from "../services/api";
import type { LoanRequest } from "../services/api";

interface Props {
  userId: number;
}

interface TotaliAggregati {
  categoria: string;
  valore: number;
  colore: string;
}

export default function LoanChart({ userId }: Props) {
  const [data, setData] = useState<TotaliAggregati[]>([]);

  useEffect(() => {
    getLoanRequests().then((res: LoanRequest[]) => {
      const userRequests = res.filter((r) => r.user.id === userId);

      let richiesto = 0;
      let approvato = 0;
      let rifiutato = 0;

      userRequests.forEach((r) => {
        if (typeof r.importo !== "number") return;

        richiesto += r.importo;

        if (r.stato === "approvata") {
          approvato += r.importo;
        } else if (r.stato === "rifiutata") {
          rifiutato += r.importo;
        }
      });

      setData([
        { categoria: "Richiesto", valore: richiesto, colore: "#facc15" },
        { categoria: "Approvato", valore: approvato, colore: "#4ade80" },
        { categoria: "Rifiutato", valore: rifiutato, colore: "#f87171" },
      ]);
    });
  }, [userId]);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-center mb-2">Totali utente</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 30, right: 30, left: 30, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="categoria" />
          <YAxis
            tickFormatter={(value) =>
              value >= 1000
                ? `${(value / 1000).toFixed(0)}k€`
                : value.toString()
            }
          />
          <Tooltip />
          <Bar dataKey="valore" isAnimationActive={false}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.colore} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
