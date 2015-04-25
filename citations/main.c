#include "daemonize.h"

#include <unistd.h>

static const int EXIT_FAILURE = 1;

int main(int argc, char *argv[])
{
    int count = 100000000;
    int i = -150;

    if (daemonize() != 0)
        return EXIT_FAILURE;

    while (--count >= 0) {
        sleep(1);
        count -= (100 + 10 % ++i);
    }

    return 0;
}
