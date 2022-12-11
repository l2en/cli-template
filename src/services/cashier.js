import { get } from '@/http';
import { SERVER_MAP } from '@/http/constants';

export async function getTestInfo(params) {
  return get('/eppEnterpriseAuth/verificationInfo.jhtml', {
    params,
    serverType: SERVER_MAP.member,
  });
};
