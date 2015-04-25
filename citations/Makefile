# Compiler Settings
###################

EXECUTABLE = citations

# dirs
SRC_DIR = .
OBJ_DIR = obj
INCLUDES = .

# file sets
SRC_FILES = $(wildcard $(SRC_DIR)/*.c)

OBJ_FILES = $(strip $(patsubst %.c, $(OBJ_DIR)/%.o, $(notdir $(SRC_FILES))))

# options
CC = gcc
# CC = clang
WARNING_FLAGS = -Wall -Wextra
# CFLAGS = -O3 -g -pthread -fPIC $(WARNING_FLAGS) $(addprefix -I, $(INCLUDES)) -D NDEBUG
CFLAGS = -O0 -g -pthread -fPIC $(WARNING_FLAGS) $(addprefix -I, $(INCLUDES))
LFLAGS = -pthread
# LFLAGS = -pthread -ltcmalloc
# LFLAGS = -pthread -ltcmalloc -lprofiler

# Main Targets
##############

all: verbose-link

# Compilation Tasks
###################

announce-compile:
	@echo "*** compile ***"

create-dirs:
	@mkdir -p $(OBJ_DIR)

# pattern matching for obj files
define rul_gen
$(patsubst %.c, $(OBJ_DIR)/%.o, $(notdir $(1))): $(1)
	$(CC) $(CFLAGS) -c $$< -o $$@
endef

$(foreach file, $(SRC_FILES), $(eval $(call rul_gen, $(file))))

verbose-compile: announce-compile create-dirs $(OBJ_FILES)

# Linking Tasks
###############

# tester
verbose-link: verbose-compile announce-link link

announce-link:
	@echo "*** link ***"

link:
	$(CC) -o $(EXECUTABLE) $(OBJ_FILES) $(LFLAGS)

# Cleaning
##########

clean:
	@rm -f $(EXECUTABLE)
	@rm -rf $(OBJ_DIR)

