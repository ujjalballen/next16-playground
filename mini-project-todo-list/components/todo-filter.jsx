"use client";

import {
  selectActiveCount,
  selectCompletedCount,
  useTodoStore,
} from "@/store/todo-store";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export default function TodoFilter() {
  const { filter, setFilter } = useTodoStore();

  const completedCount = useTodoStore(selectCompletedCount);
  const activeCount = useTodoStore(selectActiveCount);

  const filters = [
    { key: "all", label: "All", count: activeCount + completedCount },
    { key: "active", label: "Active", count: activeCount },
    { key: "completed", label: "Completed", count: completedCount },
  ];

  return (
    <Card className={"mb-6"}>
      <CardContent className={"p-4"}>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-2">
            {filters.map(({ key, label, count }) => (
              <Button
                key={key}
                variant={filter === key ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(key)}
                className={"relative cursor-pointer"}
              >
                {label}
                {count > 0 && (
                  <span className=" bg-muted text-xs text-muted-foreground rounded-full px-2">
                    {count}
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
