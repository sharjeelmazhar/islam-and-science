import { createFileRoute } from "@tanstack/react-router";
import { Journey } from "@/components/journey/Journey";

export const Route = createFileRoute("/")({ component: Journey });
