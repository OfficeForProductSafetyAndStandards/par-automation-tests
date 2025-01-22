const { request } = require('playwright');

class RequestCommonActions {
    async getRequest(url, headers = {}) {
        const response = await request.get(url, { headers });
        return this.handleResponse(response);
    }

    async postRequest(url, body, headers = {}) {
        const response = await request.post(url, {
            data: body,
            headers,
        });
        return this.handleResponse(response);
    }

    async putRequest(url, body, headers = {}) {
        const response = await request.put(url, {
            data: body,
            headers,
        });
        return this.handleResponse(response);
    }

    async deleteRequest(url, headers = {}) {
        const response = await request.delete(url, { headers });
        return this.handleResponse(response);
    }

    async handleResponse(response) {
        const status = response.status();
        const contentType = response.headers()['content-type'];
        let body;

        if (contentType && contentType.includes('application/json')) {
            body = await response.json();
        } else {
            body = await response.text();
        }

        if (!response.ok()) {
            throw new Error(
                `Request failed with status ${status}: ${JSON.stringify(body)}`
            );
        }

        return { status, body };
    }

}

module.exports = RequestCommonActions;
