import { get } from '@/http';
import { SERVER_MAP } from '@/constants/server.config';

export async function getTestInfo(params) {
  return get('/eppEnterpriseAuth/verificationInfo.jhtml', {
    params,
    serverType: SERVER_MAP.member,
  });
};
