import { Card, CardContent } from "@/components/ui/card";

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md text-center shadow-2xl rounded-2xl">
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold mb-4 text-primary">BogeyBuddies</h1>
          <p className="text-muted-foreground mb-6">
            An app for tracking golf scores - coming soon! (maybe)
          </p>
          <div className="text-8xl mb-6 animate-bounce">⛳🏌️‍♂️</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
