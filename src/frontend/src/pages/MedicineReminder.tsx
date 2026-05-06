import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bell, Plus, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Reminder {
  id: string;
  name: string;
  time: string;
  notified: boolean;
}

export function MedicineReminder() {
  const [medicineName, setMedicineName] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [error, setError] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Check reminders every 30 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const currentTime = `${hh}:${mm}`;

      setReminders((prev) =>
        prev.map((r) => {
          if (r.time === currentTime && !r.notified) {
            window.alert(`⏰ Time to take your medicine: ${r.name}!`);
            return { ...r, notified: true };
          }
          return r;
        }),
      );
    }, 30_000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleAddReminder = () => {
    if (!medicineName.trim() || !reminderTime) {
      setError("Please fill in both Medicine Name and Reminder Time.");
      return;
    }
    setError("");
    const newReminder: Reminder = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: medicineName.trim(),
      time: reminderTime,
      notified: false,
    };
    setReminders((prev) => [...prev, newReminder]);
    setMedicineName("");
    setReminderTime("");
  };

  const handleDelete = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  const formatTime = (time: string) => {
    const [hh, mm] = time.split(":");
    const hours = Number.parseInt(hh, 10);
    const ampm = hours >= 12 ? "PM" : "AM";
    const display = hours % 12 === 0 ? 12 : hours % 12;
    return `${display}:${mm} ${ampm}`;
  };

  return (
    <section id="medicine-reminder" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Section header */}
        <div className="text-center mb-10">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
            💊 Medicine Reminder
          </Badge>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
            Medicine Reminder
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Never miss a dose — set your reminders here
          </p>
        </div>

        {/* Input card */}
        <div className="bg-card border border-border rounded-2xl shadow-card p-6 md:p-8 mb-8">
          <div className="grid sm:grid-cols-2 gap-5 mb-5">
            {/* Medicine name */}
            <div className="space-y-1.5">
              <Label
                htmlFor="medicine-name"
                className="text-foreground font-medium"
              >
                Medicine Name
              </Label>
              <Input
                id="medicine-name"
                type="text"
                placeholder="e.g. Paracetamol"
                value={medicineName}
                onChange={(e) => {
                  setMedicineName(e.target.value);
                  if (error) setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleAddReminder()}
                className="h-11 rounded-xl border-input bg-background focus:ring-2 focus:ring-primary/30"
                data-ocid="medicine_reminder.input"
              />
            </div>

            {/* Reminder time */}
            <div className="space-y-1.5">
              <Label
                htmlFor="reminder-time"
                className="text-foreground font-medium"
              >
                Reminder Time
              </Label>
              <Input
                id="reminder-time"
                type="time"
                value={reminderTime}
                onChange={(e) => {
                  setReminderTime(e.target.value);
                  if (error) setError("");
                }}
                className="h-11 rounded-xl border-input bg-background focus:ring-2 focus:ring-primary/30"
                data-ocid="medicine_reminder.time_input"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <p
              className="text-destructive text-sm mb-4 font-medium"
              data-ocid="medicine_reminder.error_state"
            >
              {error}
            </p>
          )}

          {/* Set Reminder button */}
          <Button
            type="button"
            onClick={handleAddReminder}
            className="teal-gradient text-primary-foreground rounded-xl h-11 px-6 font-semibold hover:opacity-90 transition-smooth shadow-elevated flex items-center gap-2"
            data-ocid="medicine_reminder.submit_button"
          >
            <Plus className="w-4 h-4" />
            Set Reminder
          </Button>
        </div>

        {/* Reminders table */}
        {reminders.length === 0 ? (
          <div
            className="bg-card border border-border rounded-2xl p-10 text-center shadow-card"
            data-ocid="medicine_reminder.empty_state"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Bell className="w-6 h-6 text-primary" />
            </div>
            <p className="text-foreground font-semibold text-base mb-1">
              No reminders set yet
            </p>
            <p className="text-muted-foreground text-sm">
              Add your first medicine above to get started.
            </p>
          </div>
        ) : (
          <div
            className="bg-card border border-border rounded-2xl shadow-card overflow-hidden"
            data-ocid="medicine_reminder.table"
          >
            {/* Scrollable on mobile */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[400px] text-sm">
                <thead>
                  <tr className="teal-gradient">
                    <th className="text-left px-5 py-3.5 text-primary-foreground font-semibold tracking-wide">
                      Medicine Name
                    </th>
                    <th className="text-left px-5 py-3.5 text-primary-foreground font-semibold tracking-wide">
                      Reminder Time
                    </th>
                    <th className="text-left px-5 py-3.5 text-primary-foreground font-semibold tracking-wide">
                      Status
                    </th>
                    <th className="text-right px-5 py-3.5 text-primary-foreground font-semibold tracking-wide">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reminders.map((reminder, i) => (
                    <tr
                      key={reminder.id}
                      className={
                        i % 2 === 0
                          ? "bg-card hover:bg-muted/30 transition-colors"
                          : "bg-muted/20 hover:bg-muted/40 transition-colors"
                      }
                      data-ocid={`medicine_reminder.item.${i + 1}`}
                    >
                      <td className="px-5 py-3.5 font-medium text-foreground">
                        {reminder.name}
                      </td>
                      <td className="px-5 py-3.5 text-foreground tabular-nums">
                        {formatTime(reminder.time)}
                      </td>
                      <td className="px-5 py-3.5">
                        {reminder.notified ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-success bg-success/10 border border-success/20 rounded-full px-2.5 py-0.5">
                            ✓ Notified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 rounded-full px-2.5 py-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Active
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => handleDelete(reminder.id)}
                          className="inline-flex items-center gap-1.5 text-destructive hover:text-destructive/80 text-xs font-semibold transition-smooth hover:scale-105"
                          aria-label={`Delete reminder for ${reminder.name}`}
                          data-ocid={`medicine_reminder.delete_button.${i + 1}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table footer note */}
            <div className="px-5 py-3 bg-muted/30 border-t border-border flex items-center gap-2">
              <Bell className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                Browser alerts fire when the current time matches your set
                reminder. Keep this tab open for notifications.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
