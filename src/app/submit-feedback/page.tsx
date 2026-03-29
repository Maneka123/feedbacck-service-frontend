import FeedbackForm from '../../components/FeedbackForm';
import Link from 'next/link';

export default function SubmitFeedbackPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <FeedbackForm />
      <p className="mt-4 text-center">
        <Link href="/admin-login" className="text-blue-500 hover:underline">
          Admin Login
        </Link>
      </p>
    </div>
  );
}