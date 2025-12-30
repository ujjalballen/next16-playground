"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

async function addUser(userData) {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return response.json();
}

export default function AddUserForm() {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      toast.success("Successfully Added!");
      queryClient.invalidateQueries({ queryKey: ["users"] });

      setFormData({ name: "", email: "" });
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name && formData.email) {
      // call mutation stuff

      mutation.mutate({ name: formData.name, email: formData.email });
    }

    console.log("Form submitted with data:", userData);
  };

  console.log(formData);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add User (useMutation example)</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Adding..." : "Add the User"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
