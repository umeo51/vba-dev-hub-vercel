import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import CodeGenerator from "./pages/CodeGenerator";
import CodeFormatter from "./pages/CodeFormatter";
import RegexTester from "./pages/RegexTester";
import Snippets from "./pages/Snippets";
import SnippetDetail from "./pages/SnippetDetail";
import ErrorDictionary from "./pages/ErrorDictionary";
import ErrorDetail from "./pages/ErrorDetail";
import References from "./pages/References";
import ReferenceDetail from "./pages/ReferenceDetail";
import Quiz from "./pages/Quiz";
import Guides from "./pages/Guides";
import FeedbackStats from "./pages/FeedbackStats";
import Playground from "./pages/Playground";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      
      {/* Playground */}
      <Route path={"/playground"} component={Playground} />
      
      {/* Code Tools */}
      <Route path={"/tools/generator"} component={CodeGenerator} />
      <Route path={"/tools/formatter"} component={CodeFormatter} />
      <Route path={"/tools/regex"} component={RegexTester} />
      
      {/* Snippets */}
      <Route path={"/snippets"} component={Snippets} />
      <Route path={"/snippets/:id"} component={SnippetDetail} />
      
      {/* Error Dictionary */}
      <Route path={"/errors"} component={ErrorDictionary} />
      <Route path={"/errors/:id"} component={ErrorDetail} />
      
      {/* References */}
      <Route path={"/references"} component={References} />
      <Route path={"/references/:id"} component={ReferenceDetail} />
      
      {/* Quiz */}
      <Route path={"/quiz"} component={Quiz} />
      
      {/* Guides */}
      <Route path={"/guides"} component={Guides} />
      <Route path={"/admin/feedback-stats"} component={FeedbackStats} />
      
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
