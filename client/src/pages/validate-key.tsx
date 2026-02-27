import { useState } from "react";
import { Link } from "wouter";
import { Key, Crown, CheckCircle2, XCircle, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

type KeyResult = {
  success: boolean;
  message: string;
  expiresAt?: string;
} | null;

export default function ValidateKey() {
  const [key, setKey] = useState("");
  const [hwid, setHwid] = useState("");
  const [result, setResult] = useState<KeyResult>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const normalizeKey = (value: string) => {
    const v = value.toUpperCase().replace(/[^A-Z0-9-]/g, "");
    const parts = v.replace(/-/g, "").match(/.{1,4}/g) || [];
    return parts.slice(0, 4).join("-");
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(normalizeKey(e.target.value));
    setResult(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!key || key.replace(/-/g, "").length !== 16) {
      toast({
        title: "Invalid key",
        description: "Key must be in format XXXX-XXXX-XXXX-XXXX",
        variant: "destructive",
      });
      return;
    }
    if (!hwid.trim()) {
      toast({
        title: "HWID required",
        description: "Enter your device HWID from the executor",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const res = await apiRequest<{ success: boolean; message: string; expiresAt?: string }>(
        "POST",
        "/api/validate-key",
        { key, hwid: hwid.trim() }
      );
      setResult(res);
      if (res.success) {
        toast({ title: "Success", description: res.message });
      } else {
        toast({ title: "Validation failed", description: res.message, variant: "destructive" });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setResult({ success: false, message: msg });
      toast({ title: "Error", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-serif text-lg font-bold">
            <Crown className="h-5 w-5 text-primary" />
            KingVypers
          </Link>
          <div className="flex gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm">Home</Button>
            </Link>
            <Link href="/admin">
              <Button variant="outline" size="sm">Admin</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container flex flex-col items-center px-4 py-12 md:py-20">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
              <Key className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="font-serif text-2xl">Validate Your Key</CardTitle>
            <CardDescription>
              Enter your license key and device HWID. On first use, the key will bind to this device.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="key">License Key</Label>
                <Input
                  id="key"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  value={key}
                  onChange={handleKeyChange}
                  maxLength={19}
                  className="font-mono tracking-widest text-center"
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hwid">Device HWID</Label>
                <Input
                  id="hwid"
                  placeholder="From your Roblox executor"
                  value={hwid}
                  onChange={(e) => { setHwid(e.target.value); setResult(null); }}
                  disabled={loading}
                />
                <p className="text-xs text-muted-foreground">
                  Get this from your script/executor when it asks for validation.
                </p>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Validating...
                  </>
                ) : (
                  "Validate Key"
                )}
              </Button>
            </form>

            {result && (
              <div
                className={`mt-6 flex items-start gap-3 rounded-lg border p-4 ${
                  result.success ? "border-chart-2/50 bg-chart-2/5" : "border-destructive/50 bg-destructive/5"
                }`}
              >
                {result.success ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-chart-2" />
                ) : (
                  <XCircle className="h-5 w-5 shrink-0 text-destructive" />
                )}
                <div className="min-w-0">
                  <p className={`font-medium ${result.success ? "text-chart-2" : "text-destructive"}`}>
                    {result.success ? "Valid" : "Invalid"}
                  </p>
                  <p className="text-sm text-muted-foreground">{result.message}</p>
                  {result.success && result.expiresAt && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Expires: {new Date(result.expiresAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 flex max-w-md flex-col items-center gap-2 text-center text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span>One key per device. Don&apos;t share your HWID.</span>
          </div>
          <Link href="/" className="text-primary hover:underline">Back to home</Link>
        </div>
      </main>
    </div>
  );
}
