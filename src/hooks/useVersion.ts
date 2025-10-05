import { useState, useEffect } from 'react';

interface VersionInfo {
  major: number;
  minor: number;
  patch: number;
  suffix?: string;
  commit?: string;
}

const useVersion = () => {
  const [version, setVersion] = useState<VersionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const response = await fetch('/version.json');
        if (!response.ok) {
          throw new Error('Failed to fetch version info');
        }
        const data: VersionInfo = await response.json();
        setVersion(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchVersion();
  }, []);

  const getVersionString = () => {
    if (!version) return '';
    return `${version.major}.${version.minor}.${version.patch}${version.suffix ? `-${version.suffix}` : ''}${version.commit ? ` (${version.commit})` : ''}`;
  };

  return { version, loading, error, getVersionString };
};

export default useVersion;
