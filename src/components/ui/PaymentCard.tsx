// Add to your file (e.g., inside Profile.tsx or a new PaymentCard.tsx)
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { CreditCard, CheckCircle } from "lucide-react";

export const PaymentMethodCard = () => {
  const [open, setOpen] = useState(false);
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");

  // Current displayed (masked) details
  const [displayBank, setDisplayBank] = useState("•••• 1234");
  const [displayName, setDisplayName] = useState("Bank Account");

  const handleUpdate = () => {
    if (!bankName || !accountNumber || !routingNumber) {
      toast({
        title: "Error",
        description: "Please fill all fields.",
        variant: "destructive",
      });
      return;
    }

    // Mock update
    const masked = `•••• ${accountNumber.slice(-4)}`;
    setDisplayBank(masked);
    setDisplayName(bankName);

    toast({
      title: "Payment Method Updated",
      description: "Your bank details have been saved.",
    });

    setOpen(false);
    // Reset form
    setBankName("");
    setAccountNumber("");
    setRoutingNumber("");
  };

  return (
    <>
      {/* ───── PAYMENT CARD ───── */}
      <Card className="bg-white/70 backdrop-blur-md border border-white/30 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <CreditCard className="w-5 h-5 mr-2 text-purple-600" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-gradient-to-r from-indigo-50 to-pink-50 rounded-xl border border-indigo-100">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium">{displayName}</p>
                <p className="text-sm text-muted-foreground">{displayBank}</p>
              </div>
            </div>
            <Button
              variant="default"
              size="sm"
              className="w-full bg-primary text-white"
              onClick={() => setOpen(true)}
            >
              Update Payment Method
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ───── UPDATE MODAL ───── */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-purple-600" />
              Update Payment Method
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="bank-name">Bank Name</Label>
              <Input
                id="bank-name"
                placeholder="e.g., Chase Bank"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="account">Account Number</Label>
              <Input
                id="account"
                placeholder="1234567890"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="routing">Routing Number</Label>
              <Input
                id="routing"
                placeholder="021000021"
                value={routingNumber}
                onChange={(e) => setRoutingNumber(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} className="bg-primary">
              <CheckCircle className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};