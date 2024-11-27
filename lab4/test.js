import { sleep } from 'k6';
import http from 'k6/http';

export const options = {
  scenarios: {
    constant_vus: {
      executor: 'constant-vus',
      vus: 50,
      duration: '10s'
    },
    ramping_vus: {
      executor: 'ramping-vus',
      stages: [
        { duration: '5s', target: 10 },
        { duration: '5s', target: 30 },    
        { duration: '5s', target: 60 }, 
      ]
    },
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 20,
      timeUnit: '1s',
      duration: '10s',
      preAllocatedVUs: 50,
    },
  },
};

export default function () {
  http.get('http://localhost:3005/products/1');
  sleep(0.5);
}
