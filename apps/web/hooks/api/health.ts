import { trpc } from "~/trpc/client";

export function useHealth() {
    const { error, data, isFetched, isFetching, isLoading, status } =
        trpc.health.getHealth.useQuery();

    return {
        error,
        data,
        isFetched,
        isFetching,
        isLoading,
        status,
    };
}
