#include <errno.h>
#include <stdio.h>
#include <unistd.h>

#include <sys/signal.h>

static const char * DEVNULL = "/dev/null";
static const int EXIT_FAILURE = 1;

// logging

void log_message(const char* message)
{
    FILE * file = fopen("/tmp/main.log", "a");
    fprintf(file, "%s\n", message);
    fclose(file);
    exit(0);
}

void signal_handler(int sig)
{
    switch (sig) {
        case SIGTERM:
            log_message("terminate (15) signal catched");
            break;
    }
}

// daemonization

inline int reborn(const char* message)
{
    pid_t pid = fork();

    if (pid == -1) {
        printf("%s, errno = %d\n", message, errno);
        return 1;
    }

    if (pid != 0) {
        _exit(0);
    }

    return 0;
}

int daemonize()
{
    int i;

    if (reborn("Daemonization failed: fork #1 failed") != 0) {
        return 1;
    } // exit parent

    if (setsid() == -1) {
        printf("Daemonization failed: setsid failed, errno = %d\n", errno);
        return 1;
    } // change

    if (reborn("Daemonization failed: fork #2 failed") != 0) {
        return 1;
    } // exit session leader

    for (i = getdtablesize(); i >= 0; i--) {
        close(i);
    } // close all descriptors

    umask(027); // create all files with 750 permission

    chdir("/");

    if ((stdin = fopen(DEVNULL, "a+")) == NULL) {
        return 1;
    }

    if ((stdout = fopen(DEVNULL, "w")) == NULL) {
        return 1;
    }

    if ((stderr = fopen(DEVNULL, "w")) == NULL) {
        return 1;
    }

    signal(SIGTERM, signal_handler);

    return 0;
}



int main(int argc, char *argv[])
{
    int count = 100000000;

    if (daemonize() != 0)
        return EXIT_FAILURE;

    while (--count >= 0) {
        sleep(100);
    }

    return 0;
}
