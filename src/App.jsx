import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "./Layouts/HomeLayout";
import Explore from "./Features/Explore/Explore";
import Artwork from "./Features/Explore/Artwork";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Market from "./Pages/Market";
import Signup from "./Features/authentication/Signup";
import { Toaster } from "react-hot-toast";
import Login from "./Features/authentication/Login";
import ProtectedRoutes from "./ui/ProtectedRoutes";
import DashboardLayout from "./Layouts/DashboardLayout";
import Dashboard from "./Features/Dashboard/user/Dashboard";
import Settings from "./Features/Dashboard/settings/Settings";
import Messages from "./Features/Dashboard/Messages/Messages";
import { DarkModeProvider } from "./hooks/DarkModeContext";
import Collection from "./Features/Dashboard/collection/Collection";
import CollectionArtworks from "./Features/Dashboard/collection/CollectionArtworks";
import Wallet from "./Features/Wallet/Wallet";
import FundWallet from "./Features/Wallet/FundWallet";
import Transfer from "./Features/Wallet/Transfer";
import Withdraw from "./Features/Wallet/Withdraw";
import FinanceContext from "./context/FinanceContext";
import CryptoWallet from "./Features/Wallet/CryptoWallet";
import MakePayment from "./Features/Wallet/MakePayment";
import BankTransfer from "./Features/Wallet/BankTransfer";
import Home from "./Pages/Home";
import TagPayment from "./Features/Wallet/TagPayment";
import Admin from "./Admin/Admin";
import AdminLayout from "./Admin/AdminLayout";
import PendingRequestsTable from "./Admin/PendingRequestsTable";
import AdminMessages from "./Admin/AdminMessages";
import Invoice from "./Admin/Invoice";
import MessageDetails from "./Features/Dashboard/Messages/MessageDetails";
import Community from "./Features/Community/Community";
import Resources from "./Features/Community/Resources";
import Privacy from "./Features/Community/Privacy";
import Subscription from "./Features/Community/Subscription";
import UserGuide from "./Features/Community/UserGuide";
import Terms from "./Features/Community/Terms";
import Sucess from "./Features/Wallet/Sucess";
import CreateUsername from "./ui/CreateUsername";
import Users from "./Admin/Users";

const router = createBrowserRouter([
  {
    element: <Signup />,
    path: "/signup",
  },
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <HomeLayout />,

    children: [
      { element: <Home />, path: "/" },
      { element: <Community />, path: "/community" },

      { element: <CreateUsername />, path: "/createusername" },

      { element: <Resources />, path: "/resources" },
      { element: <Privacy />, path: "/privacy" },

      { element: <Subscription />, path: "/community/Subscription" },

      { element: <UserGuide />, path: "/community/guides" },

      { element: <Terms />, path: "/community/Terms" },

      {
        element: <Market />,
        path: "/explore",
      },

      {
        element: <Explore />,
        path: "/market",
      },
      {
        element: (
          <ProtectedRoutes>
            <Artwork />
          </ProtectedRoutes>
        ),
        path: "/artwork/:id",
      },
      {
        element: (
          <ProtectedRoutes>
            <DashboardLayout />
          </ProtectedRoutes>
        ),
        path: "/dashboard",
        children: [
          { index: true, element: <Dashboard /> },
          {
            element: <Dashboard />,
            path: "/dashboard/user",
          },
          {
            element: <Collection />,
            path: "/dashboard/collection",
            children: [
              {
                path: "/dashboard/collection/:id",
                element: <CollectionArtworks />,
              },
            ],
          },
          {
            element: <Settings />,
            path: "/dashboard/settings",
          },

          {
            element: (
              <FinanceContext>
                <FundWallet />
              </FinanceContext>
            ),
            path: "/dashboard/wallet/fund",
            children: [
              {
                element: <BankTransfer />,
                path: `/dashboard/wallet/fund/Bank Transfer`,
              },

              {
                element: <TagPayment />,
                path: "/dashboard/wallet/fund/paypal",
              },
              {
                element: <TagPayment />,
                path: `/dashboard/wallet/fund/zelle`,
              },
              {
                element: <TagPayment />,
                path: `/dashboard/wallet/fund/cashapp`,
              },
              {
                element: <CryptoWallet />,
                path: "/dashboard/wallet/fund/cryptowallet",
                children: [
                  {
                    element: <MakePayment />,
                    path: "/dashboard/wallet/fund/cryptowallet/:id",
                  },
                ],
              },
            ],
          },
          {
            element: <Transfer />,
            path: "/dashboard/wallet/transfer",
          },
          {
            element: <Withdraw />,
            path: "/dashboard/wallet/withdraw",
          },
          {
            element: <Wallet />,
            path: "/dashboard/wallet",
          },
          {
            element: <Sucess />,
            path: `/dashboard/wallet/success`,
          },
          {
            element: <Messages />,
            path: "/dashboard/messages",
            children: [
              { path: "/dashboard/messages/:id", element: <MessageDetails /> },
            ],
          },
        ],
      },
    ],
  },

  {
    element: <AdminLayout />,
    path: `/admin`,

    children: [
      {
        element: <Admin />,
        path: "/admin",
      },
      { element: <PendingRequestsTable />, path: "/admin/pending" },

      { element: <Invoice />, path: "/admin/pending/invoice" },

      { element: <AdminMessages />, path: "/admin/messages" },

      { element: <Users />, path: "/admin/users" },
    ],
  },
]);

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      staleTime: 10,
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <RouterProvider router={router}></RouterProvider>
      </DarkModeProvider>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: `var(--white-100)`,
            color: `var(--white-900)`,
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
