// ═══════════════════════════════
// Root Page
// Purpose: Redirect to default locale
// Route: /
// ═══════════════════════════════

import { redirect } from "next/navigation"

export default function RootPage() {
  redirect("/en")
}
