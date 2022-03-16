import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';

import { AuthProvider, useAuth } from '../../hooks/auth';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
  it('should be able to sign in', async () => {
    apiMock.onPost('sessions').reply(200, {
      user: {
        id: 'user-123',
        name: 'John Doe',
        email: 'johndoe@exemplo.com.br',
      },
      token: 'token-123',
    });

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'johndoe@exemple.com.br',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(result.current.user.email).toEqual('johndoe@exemplo.com.br');
  });
});
