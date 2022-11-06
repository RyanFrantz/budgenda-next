import { useRouter } from 'next/router';

export default function Meeting() {
  const router = useRouter();
  const { meetingId } = router.query;
  return (
    <h1>Meeting ID: {meetingId}</h1>
  );
};
