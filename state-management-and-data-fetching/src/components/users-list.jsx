"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

async function fetchUsers() {
  const response = await fetch("/api/users");
  return response.json();
}

export default function UsersList() {
  const { isPending, isError, data:users, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  console.log("data:", users);

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users List(Query examples)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {users.map((user) => (
            <div
              key={user?.id}
              className="flex items-center justify-between p-2 border rounded"
            >
              <div>
                <div className="font-medium">{user?.name}</div>
                <div className="text-sm text-muted-foreground">
                  {user?.email}
                </div>
              </div>
              <Button
              variant="destructive"
              size="sm"
              
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
