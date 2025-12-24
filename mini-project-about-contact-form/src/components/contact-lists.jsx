import { getContacts } from "../../actions";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default async function ContactLists() {
  const contacts = await getContacts();
  console.log(contacts);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Contact Message</h2>
        <Badge variant={"secondary"}>{contacts.length} messsages</Badge>
      </div>

      {contacts.length === 0 ? (
        <p>No Contacts is here!</p>
      ) : (
        <div className="grid gap-4">
          {contacts.map((contact, index) => (
            <Card key={contact._id}>
              <CardHeader className={"pb-3"}>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className={"text-lg"}>
                      {contact.subject}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      From: {contact.name} ({contact.email})
                    </p>
                  </div>
                  <Badge
                    variant={contact.status === "new" ? "default" : "secondary"}
                  >
                    {contact.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {contact.message}
                </p>
                <p className="flex items-center justify-between pt-4 border-t">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </p>

                <div className="flex items-end gap-2">
                  {contact.status === "new" && (
                    <form >
                      <Button variant="outline" size="sm" type="submit">
                        Mark as Read
                      </Button>
                    </form>
                  )}
                  {contact.status === "read" && (
                    <form>
                      <Button variant="outline" size="sm" type="submit">
                        Mark as Replied
                      </Button>
                    </form>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
