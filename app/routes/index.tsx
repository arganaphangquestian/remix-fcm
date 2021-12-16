import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json } from "remix";
import { useEffect, useState } from "react";
import DATA from "~/utils/data.json";
import { getMessaging, onMessage } from "firebase/messaging";

type Transaction = {
  id: number;
  name: string;
  amount: number;
  user: {
    id: number;
    name: string;
  };
};

export let loader: LoaderFunction = () => {
  let data: Transaction[] = DATA;
  return json(data);
};

export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

export default function Index() {
  let data = useLoaderData<Transaction[]>();
  const [transaction, setTransaction] = useState(data);
  // TODO: Observe FCM and filter the type for action
  useEffect(() => {
    onMessage(getMessaging(), (payload) => {
      console.log(payload);
      if (payload.data?.["type"] === "ADD_TRANSACTION") {
        setTransaction((prev) => [
          ...prev,
          JSON.parse(payload.data?.body ?? "") as Transaction,
        ]);
      }
    });
    return () => {};
  }, []);
  return (
    <div className="w-full min-h-screen flex flex-col px-8 py-6">
      <div className="mb-8 rounded-md bg-white px-4 py-3">
        <h1>Transaction</h1>
      </div>
      <div className="flex-1">
        <table className="table-auto w-full">
          <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
            <tr>
              <th className="p-2 whitespace-nowrap">
                <span className="font-semibold text-left">ID</span>
              </th>
              <th className="p-2 whitespace-nowrap">
                <span className="font-semibold text-left">
                  Transaction Name
                </span>
              </th>
              <th className="p-2 whitespace-nowrap">
                <span className="font-semibold text-left">Amount</span>
              </th>
              <th className="p-2 whitespace-nowrap">
                <span className="font-semibold text-left">User</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {transaction.map((item) => (
              <tr key={item.id}>
                <th className="p-2 whitespace-nowrap">
                  <span className="font-light text-left">{item.id}</span>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <span className="font-light text-left">{item.name}</span>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <span className="font-light text-left">{item.amount}</span>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <span className="font-light text-left">{item.user.name}</span>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
