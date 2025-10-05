import { useMemo } from 'react';
import type { VersionInfo } from '../types';
import versionData from '../data/version.json' assert { type: 'json' };

const useVersion = () => {
  const version: VersionInfo = useMemo(() => versionData as VersionInfo, []);

  const getVersionString = () => {
    return `${version.major}.${version.minor}.${version.patch}${version.suffix ? `-${version.suffix}` : ''}${version.commit ? ` (${version.commit})` : ''}`;
  };

  return { version, loading: false, error: null, getVersionString };
};

export default useVersion;
